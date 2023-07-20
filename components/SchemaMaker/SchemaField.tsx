import { FC } from "react";
import { createRoot } from "react-dom/client";
import { SchemaFieldTypes } from "../../lib/constants";
import styles from "./index.module.scss";

interface SchemaFieldProps {
  elementsIds: string;
}

export const SchemaField: FC<SchemaFieldProps> = ({ elementsIds }) => {
  function addElement(parent: HTMLDivElement): void {
    const dummy = document.createElement("div");
    const dummyRoot = createRoot(dummy);

    dummy.classList.add(styles.schema);

    dummyRoot.render(<SchemaField elementsIds={elementsIds} />);

    parent.appendChild(dummy);
  }

  return (
    <>
      <input className={styles.schema__input} name="name" placeholder="Имя поля" required />

      <select className={styles.schema__select} name="dataType" defaultValue="" required>
        <option disabled value="">
          [тип данных]
        </option>

        {SchemaFieldTypes.map(
          (type) => (<option key={type} value={type}>{type}</option>)
        )}
      </select>

      <button
          title="Удалить поле"
          className={styles.schema__button}
        onClick={(event) => {
          const parent = (event.target as HTMLButtonElement)
            .parentNode as HTMLDivElement;

          const container = parent.parentNode as HTMLDivElement;

          container.removeChild(parent);

          if (container.id === elementsIds && container.children.length == 0) {
            addElement(container);
          }
        }}
      >
       -
      </button>

      <button
          className={styles.schema__button}
          title="Добавить поле на текущем уровне"
        onClick={(event) => {
          addElement(
            ((event.target as HTMLButtonElement).parentNode as HTMLDivElement)
              .parentNode as HTMLDivElement
          )
        }}
      >
        +
      </button>
      <button
          className={`${styles.schema__buttonSub} ${styles.schema__button}`}
          title="Добавить вложенное поле"
        onClick={(event) => {
          const parent = (event.target as HTMLButtonElement)
            .parentNode as HTMLDivElement;

          const childs = parent.querySelector(
            "[data-id=childs]"
          ) as HTMLDivElement;

          const select = parent.querySelector(
            "[name='dataType']"
          ) as HTMLSelectElement;

          select.options[0].innerText = "[вложенные поля]";

          select.value = "";
          select.disabled = true;
          select.required = false;

          addElement(childs);
        }}
      >
        .
      </button>
      <div className={styles.schema__childs} data-id="childs"/>
    </>
  );
};

export default SchemaField;
