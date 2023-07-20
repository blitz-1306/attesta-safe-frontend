import { FC } from 'react';
import { HowItWorksCardType } from '../../../lib/types';
import Image from 'next/image';
import styles from '../styles/howItWorksSection/howItWorksSectionCard.module.scss';

const HowItWorksSectionCard: FC<HowItWorksCardType> = ({ title, list }) => {
  return (
    <div className={styles['how-it-works-section-card']}>
      <div className={styles['how-it-works-section-card__header']}>
        <h3
          className={styles['how-it-works-section-card__title']}
          dangerouslySetInnerHTML={{__html: title}}
        />
      </div>
      <ul className={styles['how-it-works-section-card__list']}>
        {list && list.map(item => (
          <li
            key={item.icon}
            className={styles['how-it-works-section-card__list-item']}
          >
            <Image
              src={`/images/svg/${item.icon}`}
              alt={item.text}
              width={24}
              height={24}
              className={styles['how-it-works-section-card__list-icon']}
            />
            <p className={styles['how-it-works-section-card__list-text']}>{ item.text }</p>
          </li>
        ))}
      </ul>
      <div className={styles['how-it-works-section-card__arrow']}>
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="8" viewBox="0 0 42 8" fill="none">
          <path d="M40.5 4L37.5 1M40.5 4L37.5 7M40.5 4L1 4M1 4L4 1M1 4L4 7" stroke="#E14E2D"/>
        </svg>
      </div>
    </div>
  );
};

export default HowItWorksSectionCard;
