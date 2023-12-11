import {FieldAttributes, Field} from 'formik'
import React from 'react'

interface InputProps extends FieldAttributes<any> {
  type: string
  id: string
  className?: string
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({type, id, name, className, placeholder}) => {
  return <Field className={className} type={type} id={id} name={name} placeholder={placeholder} />
}
