import { FC } from 'react';
import ServiceFeaturesCards from "./ServiceFeaturesCards";
import styles from '../styles/serviceFeatures/serviceFeatures.module.scss';
import Image from "next/image";

const ServiceFeatures: FC = () => {
  return (
    <section className={styles['service-features']}>
      <div className={`attesta-safe-container ${styles['service-features__container']}`}>
        <Image
          src="/images/webp/triangle-background-image.webp"
          alt="Triangle Background"
          width="354"
          height="354"
          quality={100}
          className={styles['service-features__triangle']}
        />
        <h2
          className={styles['service-features__title']}
        >
          Возможности AttestaSafe
        </h2>
        <ServiceFeaturesCards />
      </div>
    </section>
  );
};

export default ServiceFeatures;
