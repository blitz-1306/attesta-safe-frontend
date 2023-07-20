export type Config = {
  ATTESTATOR_CONTRACT_ADDRESS: string;
  CHAIN_ID: string;
  EXPLORER_ADDRESS: string;
};

type SchemaElementType<T> = { name: string; dataType: string; childs: T[] };

export interface SchemaElement extends SchemaElementType<SchemaElement> {}

export type DynamicAttestationData = {
  name: string;
  typeName: string;
  data: any;
};

export type SynteticTypedData = {
  schema: SchemaElement[];
  data: { body: { [key: string]: any }; expiriable: boolean };
};

export type SynteticTypedDataEncoded = {
  schema: SchemaElement[];
  schemaEncoded: string[];
  data: string;
  expiriable: boolean;
};

export type DynamicDataStructOutput = [string, string, string] & {
  data: string;
  typeName: string;
  name: string;
};

export type TypedAttestation = {
  name: string;
  body: { [key: string]: any };
  attestor: string;
  attestorName: string;
  expireAt: number;
  verificationRank: number;
};

export type DynamicAttestation = {
  [key: string]: {
    body: { [key: string]: any };
    attestor: string;
    attestorName: string;
    expireAt: number;
    verificationRank: number;
  };
};

export type HeaderLink = {
  url: string;
  label: string;
};

export type ServiceFeaturesCardTypes = {
  title: string;
  description: string;
};

export type AttestationCard = {
  title: string;
  list: string[];
}

export type HowItWorksCardType = {
  title: string;
  list: { icon: string, text: string }[];
}
