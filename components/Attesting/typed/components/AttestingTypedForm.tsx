import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Box, Button, Typography } from "@mui/material";
import { ChildData } from "../index";
import AttestingFormField from "./AttestingFormField";
import styles from "../index.module.scss";

interface AttestingTypedFormProps {
  name: string;
  data: ChildData[];
  onSubmit: (formData: ChildData[]) => void;
}

const AttestingTypedForm: FC<AttestingTypedFormProps> = ({
  name,
  data,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    id: string | undefined
  ) {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const updatedData = JSON.parse(JSON.stringify(prevFormData));
      updateValue(updatedData, id, value);
      return updatedData;
    });
  }

  const updateValue = (
    data: ChildData[],
    id: string | undefined,
    value: string
  ) => {
    data.forEach((item) => {
      if (item.id === id) {
        item.value = value;
      } else if (item.childs && item.childs.length > 0) {
        updateValue(item.childs, id, value);
      }
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const renderInputs = (
    childs: ChildData[],
    nestedLevel = 0
  ): ReactElement[] => {
    return (
      childs &&
      childs.map((child, idx) => (
        <Box
          key={idx}
          sx={{ display: "flex", gap: "12px", flexDirection: "column" }}
        >
          {!child.dataType ? (
            <Typography variant={nestedLevel ? "h6" : "h5"}>
              {child.name}
            </Typography>
          ) : (
            <AttestingFormField
              id={child.id}
              name={child.name}
              dataType={child.dataType}
              value={child.value}
              onChange={(value) => handleInputChange(value, child.id)}
            />
          )}
          {child.childs.length > 0 &&
            renderInputs(child.childs, nestedLevel + 1)}
        </Box>
      ))
    );
  };

  return (
    <form className={styles.attesting__form} onSubmit={handleSubmit}>
      <Typography variant="h4">{name}</Typography>

      {renderInputs(formData)}

      <Box sx={{ textAlign: "center" }}>
        <Button
          sx={{ width: "200px", padding: "16px 0", marginLeft: "5px" }}
          type="submit"
          variant="contained"
        >
          Аттестовать
        </Button>
      </Box>
    </form>
  );
};

export default AttestingTypedForm;
