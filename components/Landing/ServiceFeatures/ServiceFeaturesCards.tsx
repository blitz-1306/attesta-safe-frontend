import { FC } from 'react';
import ServiceFeaturesCard from "./ServiceFeaturesCard";
import { serviceFeaturesCards } from "../../../lib/constants";
import styles from '../styles/serviceFeatures/serviceFeaturesCards.module.scss';

const ServiceFeaturesCards: FC = () => {
  return (
    <div className={styles['service-features-cards']}>
      {serviceFeaturesCards.map(card => (
        <ServiceFeaturesCard
          key={card.title}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default ServiceFeaturesCards;
