import { FC } from 'react'
import { headerNavigationList } from "../../../lib/constants";
import styles from '../styles/header/headerNavigation.module.scss'
import Link from "next/link";

const HeaderNavigation: FC = () => {
  return (
    <>
      <nav className={styles['header-nav']}>
        <ul className={styles['header-nav__list']}>
          {headerNavigationList.map(navItem => (
            <li
              key={navItem.label}
              className={styles['header-nav__item']}
            >
              <Link
                href={navItem.url}
                className={styles['header-nav__link']}
              >
                { navItem.label }
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default HeaderNavigation
