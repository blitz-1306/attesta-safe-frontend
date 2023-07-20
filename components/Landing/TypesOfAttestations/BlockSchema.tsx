import { FC } from 'react';
import Image from "next/image";
import styles from '../styles/typesOfAttestations/block-schema.module.scss';

const BlockSchema: FC = () => {
  return (
    <div className={styles['block-schema']}>
      <div className={styles['block-schema__wrapper']}>
        <div className={styles['block-schema__left']}>
          <div className={styles['block-schema__left-item']}>
            <Image
              src="/images/svg/people-icon.svg"
              alt="Individuals"
              width={32}
              height={32}
            />
            <span className={styles['block-schema__left-item-name']}>Физические лица</span>
            <span className={styles['block-schema__left-item-address']}>0х01</span>
          </div>
          <div className={styles['block-schema__left-request']}>
            <div className={styles['block-schema__left-request-arrow-left']}>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="49" viewBox="0 0 23 49" fill="none">
                <path d="M0.5 0.757306V48.5001H22.5" stroke="#E14E2D"/>
              </svg>
            </div>
            <p className={styles['block-schema__left-request-text']}>/Запрос аттестации</p>
            <div className={styles['block-schema__left-request-arrow-right']}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="41" viewBox="0 0 26 41" fill="none">
                <path d="M22 40V0.5H0M22 40L25 37M22 40L19 37" stroke="#E14E2D"/>
              </svg>
            </div>
          </div>
          <div className={styles['block-schema__left-item']}>
            <Image
              src="/images/svg/government-icon.svg"
              alt="Individuals"
              width={32}
              height={32}
            />
            <span className={styles['block-schema__left-item-name']}>Гос. организации</span>
            <span className={styles['block-schema__left-item-address']}>0х02</span>
          </div>
          <div className={styles['block-schema__left-item']}>
            <Image
              src="/images/svg/private-org-icon.svg"
              alt="Individuals"
              width={32}
              height={32}
            />
            <span className={styles['block-schema__left-item-name']}>Частные организации</span>
            <span className={styles['block-schema__left-item-address']}>0х03</span>
          </div>
          <div className={styles['block-schema__left-middle-arrow']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="170" height="200" viewBox="0 0 170 200" fill="none">
              <path d="M136.5 4V198.743L0 198.743M136.5 4H169M136.5 4H105M169 4L166 1M169 4L166 7" stroke="#E14E2D"/>
            </svg>
          </div>
          <div className={styles['block-schema__left-bottom-request']}>
            <div className={styles['block-schema__left-bottom-request-arrow-left']}>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="49" viewBox="0 0 23 49" fill="none">
                <path d="M0.5 0.757306V48.5001H22.5" stroke="#E14E2D"/>
              </svg>
            </div>
            <p className={styles['block-schema__left-bottom-request-text']}>/Частная инициатива</p>
          </div>
        </div>
        <div className={styles['block-schema__center']}>
          <p className={styles['block-schema__center-text']}>Смарт-контракт Attestator</p>
        </div>
        <div className={styles['block-schema__right']}>
          <div className={styles['block-schema__right-arrows']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="196" height="73" viewBox="0 0 196 73" fill="none">
              <path d="M0 37.5H193M193 37.5V1M193 37.5V71.5M193 1L190.5 3.5M193 1L195.5 3.5M193 71.5L195.5 69M193 71.5L190.5 69" stroke="#E14E2D"/>
            </svg>
          </div>
          <div className={styles['block-schema__right-card']}>
            <p
              className={styles['block-schema__right-card-text']}
            >
              Аттестация 0х01 от 0х02
            </p>
            <div
              className={styles['block-schema__right-card-type']}
            >
              <p className={styles['block-schema__right-card-type-text']}>
                Акредитованная
              </p>
            </div>
          </div>
          <div className={styles['block-schema__right-card']}>
            <p
              className={styles['block-schema__right-card-text']}
            >
              Аттестация 0х01 от 0х03
            </p>
            <div
              className={styles['block-schema__right-card-type']}
            >
              <p className={styles['block-schema__right-card-type-text']}>
                Добровольная
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockSchema;
