import { FC } from 'react';
import HeroSectionNavigation from "./HeroSectionNavigation";
import styles from '../styles/heroSection/heroSection.module.scss'

const HeroSection: FC = () => {
  return (
    <section className={styles['hero-section']}>
      <div className="attesta-safe-container">
        <h1
          className={styles['hero-section__title']}
        >
          Attesta<span className={styles['hero-section__title--orange']}>Safe</span>
          <span className={styles['hero-section__title-icon']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="225" height="252" viewBox="0 0 225 252" fill="none">
              <path d="M40.1903 114.194L21.1222 43.0377L36.3046 38.9247L114.911 17.9468L126.041 59.062L164.759 48.7571L203.971 195.041L189.207 198.973L71.3567 230.498L61.1319 192.342M23.8586 117.327L0.787354 31.2471L114.073 0.892388C117.227 2.71253 120.323 4.63659 123.463 6.48416C132.086 11.5592 140.768 16.5567 149.43 21.5655C154.203 24.3249 158.955 27.123 163.746 29.8509C167.332 31.8925 170.969 33.8588 174.524 35.9511C175.696 36.6408 176.884 37.3181 178.025 38.0567C178.308 38.2397 178.925 38.5976 179.107 38.8588C179.442 39.3389 179.635 40.3955 179.808 40.9758C180.392 42.9412 180.972 44.9091 181.503 46.8893L224.331 206.879L59.6848 250.996L45.4896 198.033" stroke="#E14E2D"/>
            </svg>
          </span>
        </h1>
        <p
          className={styles['hero-section__description']}
        >
          Протокол, который позволяет быстро и эффективно проверять личность,
          не раскрывая личные данные пользователей.
        </p>
        <HeroSectionNavigation />
      </div>
    </section>
  )
}

export default HeroSection
