import { FC } from 'react';
import Image from "next/image";
import styles from '../styles/typesOfAttestations/typesOfAttestationsCard.module.scss';

interface TypeOfAttestationsCardProps {
  title: string;
  list: string[];
}

const TypeOfAttestationsCard: FC<TypeOfAttestationsCardProps> = ({ title, list }) => {
  return (
    <div className={styles['types-of-attestations-card']}>
      <h3 className={styles['types-of-attestations-card__title']}>
        { title }
      </h3>
      <ul className={styles['types-of-attestations-card__list']}>
        {list && list.map(text => (
          <li
            key={text}
            className={styles['types-of-attestations-card__list-item']}
          >
            <Image
              src="/images/svg/orange-checkmark.svg"
              alt={text}
              width={24}
              height={24}
            />
            { text }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeOfAttestationsCard;
