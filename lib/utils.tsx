import { BigNumber } from "ethers";
import { defaultAbiCoder, keccak256 } from "ethers/lib/utils";
import { Attestator } from "../contracts/types";
import dayjs from "dayjs";
import {
  DynamicAttestation,
  DynamicAttestationData,
  DynamicDataStructOutput,
  SchemaElement,
  TypedAttestation,
} from "./types";

const encodeSchemaElement = (el: SchemaElement) => {
  const encodedElements: string[] = [];

  if (el.childs.length > 0) {
    for (const child of el.childs) {
      encodedElements.push(encodeSchemaElement(child));
    }
  }

  return defaultAbiCoder.encode(
    ["string", "string", "bytes[]"],
    [el.name, el.dataType, encodedElements]
  );
};

export const encodeSchema = (schema: SchemaElement[]) =>
  schema.map((el) => encodeSchemaElement(el));

const decodeSchemaElement = (elementBytes: string) => {
  const decoded = defaultAbiCoder.decode(
    ["string", "string", "bytes[]"],
    elementBytes
  );

  const childs: SchemaElement[] = [];

  if (decoded[2].length > 0) {
    for (const childBytes of decoded[2]) {
      childs.push(decodeSchemaElement(childBytes));
    }
  }

  return { name: decoded[0], dataType: decoded[1], childs: childs };
};

export const decodeSchema = (schemaBytes: string[]) =>
  schemaBytes.map((el) => decodeSchemaElement(el));

const getSchemaElementHash = (el: SchemaElement) => {
  const childHashes: string[] = [];

  let elementHash = keccak256(
    defaultAbiCoder.encode(["string", "string"], [el.name, el.dataType])
  );
  if (el.childs.length > 0) {
    for (const child of el.childs) {
      childHashes.push(getSchemaElementHash(child));
    }

    elementHash = keccak256(
      defaultAbiCoder.encode(["string", "bytes32[]"], [el.name, childHashes])
    );
  }

  return elementHash;
};

export const getSchemaHash = (schema: SchemaElement[]) =>
  keccak256(
    defaultAbiCoder.encode(
      ["bytes32[]"],
      [schema.map((el) => getSchemaElementHash(el))]
    )
  );

const encodeAttestDataElement = (
  data: any,
  elementSchema: SchemaElement
): string => {
  if (elementSchema.childs.length == 0) {
    return defaultAbiCoder.encode([elementSchema.dataType], [data]);
  }

  return defaultAbiCoder.encode(
    ["bytes[]"],
    [
      elementSchema.childs.map((el) => {
        return encodeAttestDataElement(data[el.name], el);
      }),
    ]
  );
};

export const encodeAttestData = (
  data: { [key: string]: any },
  schema: SchemaElement[]
) =>
  defaultAbiCoder.encode(
    ["bytes[]"],
    [schema.map((el) => encodeAttestDataElement(data[el.name], el))]
  );

const decodeAttestationDataElement = (
  elementData: string,
  elementSchema: SchemaElement
): { [key: string]: any } => {
  if (elementSchema.childs.length == 0) {
    return defaultAbiCoder
      .decode([elementSchema.dataType], elementData)[0]
      .toString();
  }

  return (defaultAbiCoder.decode(
    ["bytes[]"],
    elementData
  )[0] as string[]).reduce(
    (res, elementBytes, i) => ({
      ...res,
      [elementSchema.childs[i].name]: decodeAttestationDataElement(
        elementBytes,
        elementSchema.childs[i]
      ),
    }),
    {} as { [key: string]: any }
  );
};

export const decodeAttestationData = (
  attestationData: string,
  schema: SchemaElement[]
): { [key: string]: any } =>
  (defaultAbiCoder.decode(["bytes[]"], attestationData)[0] as string[]).reduce(
    (res, elementBytes, i) => ({
      ...res,
      [schema[i].name]: decodeAttestationDataElement(elementBytes, schema[i]),
    }),
    {} as { [key: string]: any }
  );

export const decodeDynamicAttestationData = (
  data: DynamicDataStructOutput[]
): DynamicAttestationData[] =>
  data.map((d) => ({
    name: d.name,
    typeName: d.typeName,
    data: defaultAbiCoder.decode([d.typeName], d.data)[0],
  }));

export const getUserTypedAttestations = async (a: Attestator, user: string) => {
  const atterstors = await a["getUserTypedAttestors(address)"](user);

  if (atterstors.length === 0) {
    return [] as TypedAttestation[];
  }
  const attestations: TypedAttestation[] = [];

  for (const attestor of atterstors) {
    const entitySchemas = await a.getEntitySchemaHashes(attestor);

    for (const schemaHash of entitySchemas) {
      const record = await a.getTypedAttestation(attestor, user, schemaHash);

      if (record.data == "0x") {
        continue;
      }

      const [name, schema] = await a.getSchema(schemaHash);

      const verificationRank = await a.entityVerificationRank(attestor);

      attestations.push({
        name,
        body: decodeAttestationData(record.data, decodeSchema(schema)),
        expireAt: Number(record.expiredAt.toString()),
        attestor,
        verificationRank
      });
    }
  }
  return attestations;
};

export const getUserDynamicAttestations = async (
  a: Attestator,
  user: string
) => {
  const attestors = await a.getUserDynamicAttestors(user);

  const attestations: DynamicAttestation = {} as DynamicAttestation;

  if (attestors.length === 0) {
    return attestations;
  }

  for (const attestor of attestors) {
    const keys = await a["getAttestorToUserClaims(address,address)"](
      attestor,
      user
    );

    for (const key of keys) {
      const record = await a.getDynamicAttestation(attestor, user, key);

      const verificationRank = await a.entityVerificationRank(attestor);

      if (record.data.length === 0) {
        continue;
      }

      attestations[key] = {
        body: decodeDynamicAttestationData(record.data),
        expireAt: Number(record.expiredAt.toString()),
        attestor,
        verificationRank
      };
    }
  }
  return attestations;
};

function renderValue(value: any): string {
  if (typeof value === "boolean") {
    return value ? "да (положительно)" : "нет (отрицательно)";
  }

  if (BigNumber.isBigNumber(value)) {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map(renderValue).join(", ");
  }

  return String(value);
}

export const renderTypedAttestationData = (data: { [key: string]: any }) => (
  <ul>
    {Object.keys(data).map((key) => (
      <li key={key}>
        {
          <div>
            <span style={{ marginRight: "5px" }}>{key}:</span>
            {isObject(data[key]) && !Array.isArray(data[key])
                ? renderTypedAttestationData(data[key])
                : <span>{renderValue(data[key])}</span>}
          </div>
        }
      </li>
    ))}
  </ul>
);

export const renderDynamicAttestationData = (data: any) => {
  return (
      <ul>
        {data.map((item: any, idx: number) => (
            <li key={idx}>
              <div>
                <span style={{ marginRight: "5px" }}>{item.name}:</span>
                  {isObject(item.data) && !Array.isArray(item.data)
                      ? renderDynamicAttestationData(item.data)
                      : renderValue(item.data)}
              </div>
            </li>
        ))}
      </ul>
  );
}

export function isObject(a: any): boolean {
  return !!a && a.constructor === Object;
}

export function timestampToLocalTimeStr(timestamp: number): string {
  return dayjs(timestamp * 1000).format("DD.MM.YYYY");
}

export const generateRandomId = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}
