import { FC } from 'react';
import Link from "next/link";
import styles from '../styles/goToServiceSection/goToServiceSection.module.scss';

const GoToServiceSection: FC = () => {
  return (
    <section className={styles['go-to-service']}>
      <div className={`attesta-safe-container ${styles['go-to-service__container']}`}>
        <h2 className={styles['go-to-service__title']}>
          Перейти в сервис
        </h2>
        <div className={styles['go-to-service__description-wrapper']}>
          <p className={styles['go-to-service__description']}>
            Воспользуйтесь прототипом сервиса чтобы оценить его функционал
          </p>
          <Link
            href="/attestator"
            className={styles['go-to-service__link']}
          >
            Перейти в сервис
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GoToServiceSection;
