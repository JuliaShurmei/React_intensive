import {Link, useNavigate} from 'react-router-dom'
import {IoMdExit} from 'react-icons/io'
import {useLocalization} from './../../contexts/LocalizationContext'
import styles from './Header.module.scss'

const Header = () => {
  const {language} = useLocalization()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Notes App
        </Link>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/private-notes" className={styles.navLink}>
              {language.private}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/public-notes" className={styles.navLink}>
              {language.publicHeader}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/change-password" className={styles.navLink}>
              {language.changePassword}
            </Link>
          </li>
          <li className={styles.navItem}>
            <div className={styles.navLink} onClick={handleLogout}>
              <IoMdExit style={{fontSize: '24px'}} />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
