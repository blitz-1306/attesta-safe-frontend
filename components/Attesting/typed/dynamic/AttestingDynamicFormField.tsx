import { FC, ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface AttestingDynamicFormFieldProps {
  name: string;
  dataType: string;
  value?: string;
  id?: string;
  type: string;
  onChange: (value: ChangeEvent<HTMLInputElement>, name: string) => void;
}

const AttestingDynamicFormField: FC<AttestingDynamicFormFieldProps> = ({
  id,
  name,
  dataType,
  value,
  onChange,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event, name);
  };

  return (
    <TextField
      id={id}
      label={`${name} | ${dataType}`}
      variant="outlined"
      name={name}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default AttestingDynamicFormField;
