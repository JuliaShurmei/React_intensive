import React from 'react'

interface ButtonProps {
  localizedValue:  string | React.ReactNode;
  className?: string
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({localizedValue, className, onClick}) => {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {localizedValue}
    </button>
  )
}
