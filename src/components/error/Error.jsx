import {ErrorMessage} from 'formik'

export const Error = ({name, component, className}) => {
  return <ErrorMessage className={className} name={name} component={component} />
}
