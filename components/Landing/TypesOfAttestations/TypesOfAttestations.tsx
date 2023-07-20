import { FC } from 'react';
import styles from '../styles/typesOfAttestations/typesOfAttestations.module.scss';
import { attestationList } from "../../../lib/constants";
import TypeOfAttestationsCard from "./TypeOfAttestationsCard";
import BlockSchema from "./BlockSchema";

const TypesOfAttestations: FC = () => {
  return (
    <div className={styles['types-of-attestations']}>
      <div className="attesta-safe-container">
        <p className={styles['types-of-attestations__description']}>В рамках проекта предусмотрены два типа аттестаций</p>
        <div className={styles['types-of-attestations__cards']}>
          {attestationList.map(attestation => (
            <TypeOfAttestationsCard
              key={attestation.title}
              title={attestation.title}
              list={attestation.list}
            />
          ))}
          <BlockSchema />
        </div>
      </div>
    </div>
  );
};

export default TypesOfAttestations;
