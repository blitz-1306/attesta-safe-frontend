import { FC } from 'react';
import styles from '../styles/howItWorksSection/howItWorksSection.module.scss';
import Image from "next/image";
import { howItWorksList } from "../../../lib/constants";
import HowItWorksSectionCard from "./HowItWorksSectionCard";

const HowItWorksSection: FC = () => {
  return (
    <section className={styles['how-it-works']}>
      <div className="attesta-safe-container">
        <div className={styles['how-it-works__text-wrapper']}>
          <h2 className={styles['how-it-works__title']}>
            Как эт<span className={styles['how-it-works__title-shape']} /> работает
          </h2>
          <div className={styles['how-it-works__description-wrapper']}>
            <p className={styles['how-it-works__description']}>
              Протоколы аттестации пользователей в блокчейне позволяют учреждениям
              проверять сведения об участниках по проверенным атрибутам,
              повышая надежность принятия решений.
            </p>
            <Image
              src='/images/svg/arrow-down-light.svg'
              alt='Arrow down'
              width="19"
              height="46"
              className={styles['how-it-works__arrow']}
            />
          </div>
        </div>
        <div className={styles['how-it-works__cards-wrapper']}>
          <div className={styles['how-it-works__cards']}>
            {howItWorksList && howItWorksList.map(card => (
              <HowItWorksSectionCard
                key={card.title}
                title={card.title}
                list={card.list}
              />
            ))}
            <div className={styles['how-it-works__user-card']}>
              <h3 className={styles['how-it-works__user-card-title']}>
                Пользователь
              </h3>
              <div className={styles['how-it-works__user-card-head']}/>
              <div className={styles['how-it-works__user-card-body']}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
