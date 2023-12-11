import React, {ComponentType} from 'react'
import {ErrorMessageProps} from 'formik'
import {ErrorMessage} from 'formik'

interface ErrorProps extends Omit<ErrorMessageProps, 'name' | 'component'> {
  name: string
  component?: string | ComponentType<{}> | undefined
  className?: string
}

export const Error: React.FC<ErrorProps> = ({name, component, className}) => {
  return <ErrorMessage className={className} name={name} component={component} />
}

