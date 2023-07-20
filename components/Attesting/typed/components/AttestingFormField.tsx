import { FC, ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface AttestingTypedFormFieldProps {
  name: string;
  dataType: string;
  value?: string;
  id?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>, name: string) => void;
}

const AttestingFormField: FC<AttestingTypedFormFieldProps> = ({
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

export default AttestingFormField;
