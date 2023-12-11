import {ReactNode} from 'react'
import {createPortal} from 'react-dom'
import styles from './Modal.module.scss'
import React from 'react'

const portal = document.getElementById('portal') as Element | DocumentFragment

export const Modal = ({children}: {children: ReactNode}) => {
  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>{children}</div>
    </div>,
    portal
  )
}
