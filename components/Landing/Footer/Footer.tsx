import { FC } from 'react';
import Logo from "../Logo";
import styles from '../styles/footer/footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles['footer']}>
      <div className={`attesta-safe-container ${styles['footer__container']}`}>
        <Logo orangeSafe={false} />
      </div>
    </footer>
  );
};

export default Footer;
