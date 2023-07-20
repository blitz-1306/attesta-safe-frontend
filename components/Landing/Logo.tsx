import { FC } from 'react';
import Link from "next/link";
import styles from './styles/logo.module.scss'

interface LogoProps {
  orangeSafe: boolean;
}

const Logo: FC<LogoProps> = ({ orangeSafe = true }) => {
  return (
    <>
      <div className={`logo ${!orangeSafe && styles['logo--opacity']}`}>
        <Link
          href="/"
          className={styles['logo__link']}
        >
          <svg className={styles['logo__link-icon']} width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.6603 11.4675L28.4836 9.29076L7.62195 29.8116V35.0816H30.6603V11.4675Z" fill="#E14E2D"/>
            <path d="M21.0786 1.50415H6.1637V30.7841H26.9896V7.55254H21.0786V1.50415Z" fill="#141414"/>
            <path d="M4.13974 33L4.13751 0H21.1494C21.523 0.373435 21.8846 0.759271 22.2551 1.13599C23.2728 2.17078 24.3016 3.19691 25.3273 4.2239C25.8923 4.78967 26.4532 5.36015 27.022 5.92221C27.4477 6.34286 27.8835 6.75491 28.3031 7.18153C28.4413 7.32217 28.5823 7.46164 28.7145 7.60798C28.7473 7.64424 28.8203 7.71755 28.836 7.76099C28.8649 7.84082 28.8523 7.99612 28.8547 8.0839C28.8627 8.38119 28.8702 8.67871 28.8703 8.9761L28.8644 33H4.13974ZM8.82557 2.4091L6.54397 2.41539L6.54461 30.5663L24.2401 30.5736L26.4562 30.577L26.4541 8.60916L20.6425 8.59943L20.6266 2.42095L8.82557 2.4091Z" fill="#F4F8FA"/>
          </svg>
          Attesta{orangeSafe ? (<span className={styles['logo__link--orange']}>Safe</span>) : 'Safe'}
        </Link>
      </div>
    </>
  )
};

export default Logo;
