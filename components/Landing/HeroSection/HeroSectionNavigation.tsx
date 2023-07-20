import { FC } from 'react';
import Link from "next/link";
import styles from '../styles/heroSection/heroSectionNavigation.module.scss';

const HeroSectionNavigation: FC = () => {
  return (
    <div className={styles['hero-section__navigation']}>
      <Link
        href="/attestator"
        className={`${styles['hero-section__navigation-link']} ${styles['hero-section__navigation-link--orange']}`}
      >
        Перейти в сервис
      </Link>
    </div>
  )
}

export default HeroSectionNavigation
