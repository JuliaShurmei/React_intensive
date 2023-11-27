import {Link} from 'react-router-dom'
import {IoMdExit} from 'react-icons/io'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Notes App
        </Link>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/private-notes" className={styles.navLink}>
              Private
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/public-notes" className={styles.navLink}>
              Public
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/change-password" className={styles.navLink}>
              Change Password
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              <IoMdExit style={{fontSize: '24px'}} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
