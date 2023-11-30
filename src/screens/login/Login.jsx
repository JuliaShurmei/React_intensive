import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form} from 'formik'
import {useLocalization} from './../../contexts/LocalizationContext'
import * as yup from 'yup'
import {Input} from '../../components/input/Input'
import {Error} from '../../components/error/Error'
import {Button} from '../../components/button/Button'
import img01 from '../../../public/img-01.webp'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {FaEnvelope} from 'react-icons/fa'
import {RiLock2Line} from 'react-icons/ri'
import styles from './Login.module.scss'

export const Login = () => {
  const {language} = useLocalization()
  const navigate = useNavigate()
  const [type, setType] = useState(false)
  const [error, setError] = useState(null)

  const toggleBtn = () => {
    setType(prevType => !prevType)
  }
  const errorMessages = {
    username: {
      required: language.errorUsernameRequired,
    },
    password: {
      required: language.errorPasswordRequired,
    },
  }

  const Schema = yup.object().shape({
    username: yup.string().required(errorMessages.username.required),
    password: yup.string().required(errorMessages.password.required),
  })

  const handleSubmit = async (values, {setSubmitting}) => {
    const data = {
      username: values.username,
      password: values.password,
    }
    try {
      const response = await fetch('https://dull-pear-haddock-belt.cyclic.app/auth', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Invalid credentials or server error')
      }
      const responseData = await response.json()
      localStorage.setItem('token', responseData.token)
      console.log('Login successful')
      navigate('/private-notes')
    } catch (error) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.loginImage}>
          <img src={img01} alt="image"></img>
        </div>
        <div className={styles.loginForm}>
          <span className={styles.loginTitle}> {language.welcomeBack}</span>
          <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={Schema}
            onSubmit={handleSubmit}>
            {({isSubmitting, errors, touched}) => (
              <Form>
                <div className={styles.formGroup}>
                  <Input
                    className={
                      errors.username && touched.username
                        ? styles.inputForm_error
                        : styles.inputForm
                    }
                    type="username"
                    id="username"
                    name="username"
                    placeholder={language.enterEmail}
                  />
                  <span className={styles.symbolInput}>
                    <FaEnvelope />
                  </span>
                  <Error name="username" component="div" className={styles.errorMessage} />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    className={
                      errors.password && touched.password
                        ? styles.inputForm_error
                        : styles.inputForm
                    }
                    type={type ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder={language.enterPassword}
                  />
                  <span className={styles.symbolInput}>
                    <RiLock2Line />
                  </span>
                  <span className={styles.symbol} onClick={toggleBtn}>
                    {type ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                  <Error name="password" component="div" className={styles.errorMessage} />
                </div>
                {error && <span className={styles.errorMessageNew}>{error}</span>}
                {!errors.username && touched.username && !errors.password && touched.password ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    localizedValue={language.login}
                    className={styles.btnSubmit}
                  />
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    localizedValue={language.login}
                    className={styles.btnSubmit}
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
