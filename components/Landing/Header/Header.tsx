import { FC } from "react";
import HeaderNavigation from "./HeaderNavigation";
import Logo from "../Logo";
import styles from '../styles/header/header.module.scss';

const LandingHeader: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={`attesta-safe-container ${styles.header__container}`}>
          <Logo orangeSafe={true} />
          <HeaderNavigation />
        </div>
      </header>
    </>
  )
};

export default LandingHeader;
