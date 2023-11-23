import {useState} from 'react'
import {Formik, Form} from 'formik'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Input} from '../../components/input/Input'
import {Error} from '../../components/error/Error'
import {Button} from '../../components/button/Button'
import {Schema} from '../../validators/Schema'
import img01 from '../../../public/img-01.webp'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {FaEnvelope} from 'react-icons/fa'
import {RiLock2Line} from 'react-icons/ri'
import styles from './Login.module.scss'

export const Login = () => {
  const {language} = useLocalization()
  const [type, setType] = useState(false)
  const toggleBtn = () => {
    setType(prevType => !prevType)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.loginImage}>
          <img src={img01} alt="image"></img>
        </div>
        <div className={styles.loginForm}>
          <span className={styles.loginTitle}> Welcome Back</span>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Schema}
            onSubmit={values => {
              // Handle submitting
              console.log(values)
            }}>
            {({isSubmitting, errors, touched}) => (
              <Form>
                <div className={styles.formGroup}>
                  <Input
                    className={
                      errors.email && touched.email ? styles.inputForm_error : styles.inputForm
                    }
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter you email"
                  />
                  <span className={styles.symbolInput}>
                    <FaEnvelope />
                  </span>
                  <Error name="email" component="div" className={styles.errorMessage} />
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
                    placeholder="Enter you password"
                  />
                  <span className={styles.symbolInput}>
                    <RiLock2Line />
                  </span>
                  <span className={styles.symbol} onClick={toggleBtn}>
                    {type ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                  <Error name="password" component="div" className={styles.errorMessage} />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  localizedValue={language.login}
                  className={styles.btnSubmit}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
