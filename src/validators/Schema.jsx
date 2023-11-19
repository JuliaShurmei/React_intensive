import * as yup from 'yup'

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
//Minimum 5 characters, at least one letter and one number

export const Schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().matches(passwordRules, {message: 'Invalid password'}).required('Required'),
})
