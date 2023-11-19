import {Field} from 'formik'

export const Input = ({type, id, name, className, placeholder}) => {
  return <Field className={className} type={type} id={id} name={name} placeholder={placeholder} />
}
