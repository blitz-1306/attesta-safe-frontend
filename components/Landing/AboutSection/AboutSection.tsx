import { FC } from 'react';
import Image from "next/image";
import styles from '../styles/aboutSection/aboutSection.module.scss'
import aboutStyle from "./index.module.scss";

const AboutSection: FC = () => {
  return (
    <section className={styles['about-section']}>
      <div className={`attesta-safe-container ${styles['about-section__container']}`}>
        <div className={styles['about-section__logo-wrapper']}>
          <Image
            src='/images/svg/ethereum-logo.svg'
            alt="Ethereum"
            width="55"
            height="90"
            className={styles['about-section__logo']}
          />
        </div>
        <p
          className={styles['about-section__description']}
        >
          Большинство транзакций в блокчейне связаны с финансовыми операциями,
          и для обеспечения безопасности и конфиденциальности данных пользователей
          требуется <span className={styles['about-section__description--orange']}>протокол</span>, который позволяет быстро и эффективно проверять личность,
          не раскрывая личные данные пользователей.
        </p>
        <div className={aboutStyle.about__image}>
          <Image
            src="/images/webp/create-schema-image-n.webp"
            alt="Create Schema image"
            width="849"
            height="377"
            quality={100}
            className={styles['about-section__schema-image']}
          />
        </div>
        <hr className={styles['about-section__divider']}/>
      </div>
    </section>
  )
};

export default AboutSection;
