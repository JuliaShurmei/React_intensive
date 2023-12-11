import React from 'react'
import styles from './Checkbox.module.scss'
import { ChangeEvent } from "react";

interface CheckboxProps {
    type: string;
    label: string;
    className?: string;
    value: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

export const Checkbox: React.FC<CheckboxProps> = ({type, label, className, value, onChange}) => {
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
