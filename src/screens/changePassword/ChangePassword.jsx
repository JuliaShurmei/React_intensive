import {useState} from 'react'
import {Formik, Form} from 'formik'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Button} from '../../components/button/Button'
import {Input} from '../../components/input/Input'
import {Error} from '../../components/error/Error'
import {ChangePasswordSchema} from '../../validators/ChangePasswordSchema'
import styles from './ChangePassword.module.scss'

export const ChangePassword = () => {
  const {language} = useLocalization()
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = () => {
    setIsSuccess(true)
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleSubmit}>
        {({isSubmitting, errors, touched}) => (
          <Form>
            {isSuccess && <div className={styles.successMessage}>{language.successMessage}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">{language.currentPassword}:</label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className={
                  errors.currentPassword && touched.currentPassword
                    ? styles.inputForm_error
                    : styles.inputForm
                }
              />
              <Error name="currentPassword" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword">{language.newPassword}:</label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                className={
                  errors.newPassword && touched.newPassword
                    ? styles.inputForm_error
                    : styles.inputForm
                }
              />
              <Error name="newPassword" component="div" className={styles.errorMessage} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">{language.confirmPassword}:</label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? styles.inputForm_error
                    : styles.inputForm
                }
              />
              <Error name="confirmPassword" component="div" className={styles.errorMessage} />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={styles.btnSubmit}
              localizedValue={language.changePassword}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}
