import styles from './Checkbox.module.scss'

export const Checkbox = ({type, label, className, value, onChange}) => {
  return (
    <div className={`${styles['checkbox-container']} ${className}`}>
      <input
        type={type}
        id={label}
        className={styles['custom-checkbox']}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}
