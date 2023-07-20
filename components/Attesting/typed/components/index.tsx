import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, useState } from "react";
import { Attestator } from "../../../../contracts/types";
import { SchemaElement } from "../../../../lib/types";
import {
  decodeSchema,
  encodeAttestData,
  generateRandomId,
} from "../../../../lib/utils";
import AttestingTypedForm from "./AttestingTypedForm";

interface AttestingProps {
  attestator: Attestator;
}

export interface ChildData {
  name: string;
  dataType: string;
  value?: string;
  id?: string;
  childs: ChildData[];
}

const CreateAttestation: FC<AttestingProps> = ({ attestator }) => {
  const [formFields, setFormFields] = useState<ChildData[]>([]);
  const [schemas, setSchemas] = useState<[string, string, string[]][]>([]);
  const [opts, setOpts] = useState<{ value: string; label: string }[]>([]);
  const [schema, setSchema] = useState<SchemaElement[]>([]);
  const [schemaHash, setSchemaHash] = useState("");
  const [name, setName] = useState("");
  const [subjectAddr, setSubjectAddr] = useState("");
  const [isSchemaOwner, setIsSchemaOwner] = useState(true);
  const [signature, setSignature] = useState("0x");
  const [isSubject, setIsSubject] = useState(false);
  const [attestorAddress, setAttestorAddress] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);

  const fillFormData = (formDataFields: ChildData[]): any => {
    return formDataFields.map((child) => {
      child.value = "";
      child.id = `${child.name.trim()}${generateRandomId(4)}`;

      if (child.childs.length > 0) {
        fillFormData(child.childs);
      }

      return child;
    });
  };

  const getData = async (attestator: Attestator): Promise<void> => {
    const currentAddress =
      attestorAddress === ""
        ? await attestator.signer.getAddress()
        : attestorAddress;

    const schemaHashes = await attestator.getEntitySchemaHashes(currentAddress);

    const extSchemas = await Promise.all(
      schemaHashes.map((schemaHash) => attestator.getSchema(schemaHash))
    );
    const opts = [];

    const schemas: [string, string, string[]][] = [];

    for (let i = 0; i < schemaHashes.length; i++) {
      const opt = {
        label: extSchemas[i][0],
        value: String(i),
      };

      opts.push(opt);

      schemas.push([schemaHashes[i], ...extSchemas[i]]);
    }
    setIsSubject(schemaHashes.length === 0);
    setSchemas(schemas);
    setOpts(opts);
  };

  const schemaChangeHandler = async (value: string) => {
    const i = parseInt(value);

    if (schemas[i] === undefined) {
      return;
    }

    const [schemaHash, name, schema] = schemas[i];

    const decoded = decodeSchema(schema);
    setIsSchemaOwner(
      await attestator.attestorHasSchema(
        await attestator.signer.getAddress(),
        schemaHash
      )
    );

    setName(name);
    setSchemaHash(schemaHash);
    setSchema(decoded);
    setFormFields(fillFormData(decoded));
  };

  function convertToAttestData(formData: ChildData[]): { [key: string]: any } {
    const result: { [key: string]: any } = {};

    for (const entry of formData) {
      result[entry.name] =
        entry.dataType === "" ? convertToAttestData(entry.childs) : entry.value;
    }

    return result;
  }

  const handleSubmitForm = async (formData: ChildData[]) => {
    console.log("Submitted Data:", formData);

    console.log("Schema:", schemaHash);
    const toAttest = convertToAttestData(formData);

    console.log("To attest:", toAttest);

    const from =
      attestorAddress === ""
        ? await attestator.signer.getAddress()
        : attestorAddress;

    const subject = subjectAddr;

    const data = encodeAttestData(toAttest, schema);

    const tx = await attestator.attestTyped(
      from,
      subject,
      schemaHash,
      data,
      expiresAt,
      signature
    );

    await tx.wait();

    window.alert("Аттестация зафиксирована");
  };

  const handleSubjectChange = (value: string) => setSubjectAddr(value);

  const handleSignatureChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSignature(event.target.value);

  const handleAttestatorAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttestorAddress(event.target.value);
    getData(attestator);
  };

  const handleExpirationDateChange = (v: any) => {
    if (v) {
      const timestamp = v.unix();

      setExpiresAt(timestamp);
    } else {
      setExpiresAt(0);
    }
  };

  getData(attestator);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        gap: "24px",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Аттестация</Typography>

      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Схема</InputLabel>
        <Select
          id="simple-select"
          labelId="simple-select-label"
          label="Схема"
          defaultValue="-1"
          variant="outlined"
          onChange={(e) => schemaChangeHandler(e.target.value)}
        >
          <MenuItem value="-1" key="-1" disabled>
            Выберите схему
          </MenuItem>
          {opts.map((opt) => (
            <MenuItem value={opt.value} key={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        {isSubject ? (
          <>
            <br />
            <TextField
              inputProps={{ maxLength: 42, minLength: 42 }}
              aria-valuemax={42}
              aria-valuemin={42}
              id="attestor-address"
              label="Адрес аттестующей организации"
              variant="outlined"
              required
              onChange={handleAttestatorAddress}
            />
          </>
        ) : null}
        <br />
        <TextField
          inputProps={{ maxLength: 42 }}
          aria-valuemax={42}
          id="outlined-basic"
          label="Адрес субъекта"
          variant="outlined"
          required
          onChange={(e) => handleSubjectChange(e.target.value)}
        />
        {!isSchemaOwner ? (
          <>
            <br />
            <TextField
              inputProps={{ maxLength: 132, minLength: 132 }}
              aria-valuemax={132}
              aria-valuemin={132}
              id="signature-field"
              label="Подпись аттестующей организации"
              onChange={handleSignatureChange}
              required
            />
          </>
        ) : null}
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Дата истечения"
            views={["day", "month", "year"]}
            onChange={handleExpirationDateChange}
            slotProps={{
              actionBar: {
                actions: ["clear"],
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
      <AttestingTypedForm
        name={name}
        data={formFields}
        onSubmit={handleSubmitForm}
      />
    </Box>
  );
};

export default CreateAttestation;
