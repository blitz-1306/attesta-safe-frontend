import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, FormEvent } from "react";
import { Attestator } from "../../contracts/types";
import { SchemaElement } from "../../lib/types";
import { encodeSchema } from "../../lib/utils";
import SchemaField from "./SchemaField";
import styles from "./index.module.scss";
import {BytesLike} from "ethers";
import callToast from "../../utils/callToast";

interface SchemaMakerProps {
  attestator: Attestator;
}

export const Index: FC<SchemaMakerProps> = ({ attestator }) => {
  const grabSchema = (element: Element): SchemaElement => {
    const name = (element.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement).value;

    const dataType = (element.querySelector(
      'select[name="dataType"]'
    ) as HTMLSelectElement).value;

    const childs = element.querySelector(
      "[data-id='childs']"
    ) as HTMLDivElement;

    return {
      name: name,
      dataType: dataType === "*" ? "" : dataType,
      childs:
        childs.children.length > 0
          ? Array.from(childs.children).map(grabSchema)
          : [],
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const elements = document.querySelectorAll("#schemaElements > div");

    const schema = Array.from(elements).map(grabSchema);
    let encoded: BytesLike[];
    try {
      encoded = encodeSchema(schema);
    } catch (err: any) {
      callToast(err.message || "Ошибка кодирования схемы", err.reason);
      return;
    }

    const name = (event.target as HTMLFormElement).schemaName.value;

    try {
      const tx = await attestator.addEntitySchema(name, encoded);

      await tx.wait();
      callToast("success", "Схема аттестации создана");
    } catch (err: any) {
      callToast("error", err.reason);
    }
  };

  return (
    <>
      <Typography variant="h5">Создание схем</Typography>

      <form className={styles.schema__page} onSubmit={handleSubmit}>
        <TextField
          type="text"
          variant="outlined"
          name="schemaName"
          label="Наименование схемы"
          required
          fullWidth
        />
        <div id="schemaElements" className={styles.schema__scheme}>
          <div>
            <SchemaField elementsIds="schemaElements" />
          </div>
        </div>

        <Box sx={{textAlign: "center"}}>
          <Button sx={{ width: "200px", padding: '16px 0', marginLeft: '5px' }} type="submit" variant="contained">Создать схему</Button>
        </Box>
      </form>
    </>
  );
};

export default Index;
