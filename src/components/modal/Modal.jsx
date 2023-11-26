import {createPortal} from 'react-dom'
import styles from './Modal.module.scss'

const portal = document.getElementById('portal')

export const Modal = ({children}) => {
  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>{children}</div>
    </div>,
    portal
  )
}
