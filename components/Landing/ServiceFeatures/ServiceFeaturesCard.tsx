import { FC } from 'react';
import styles from '../styles/serviceFeatures/serviceFeaturesCard.module.scss';

interface ServiceFeaturesCardProps {
  title: string;
  description: string;
}

const ServiceFeaturesCard: FC<ServiceFeaturesCardProps> = ({ title, description }) => {
  return (
    <div className={styles['service-features-card']}>
      <h3
        className={styles['service-features-card__title']}
        dangerouslySetInnerHTML={{__html: title}}
      />
      <p className={styles['service-features-card__description']}>{ description }</p>
    </div>
  );
};

export default ServiceFeaturesCard;
