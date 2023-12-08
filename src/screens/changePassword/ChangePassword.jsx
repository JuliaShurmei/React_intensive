import {useMemo} from 'react'
import * as yup from 'yup'
import {Formik, Form} from 'formik'
import {useLocalization} from './../../contexts/LocalizationContext'
import {Button} from '../../components/button/Button'
import {Input} from '../../components/input/Input'
import {Error} from '../../components/error/Error'
import styles from './ChangePassword.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {changePassword} from '../../redux/middleware/changePasswordThunk'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ChangePassword = () => {
  const {language} = useLocalization()
  const dispatch = useDispatch()
  const isSuccess = useSelector(state => state.auth?.isSuccess)

  const ChangePasswordSchema = useMemo(() => {
    const errorMessages = {
      newPassword: {
        required: language.errorPasswordRequired,
      },
    }

    return yup.object().shape({
      newPassword: yup
        .string()
        .required(errorMessages.newPassword.required)
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    })
  }, [language])

  const handleSubmit = async values => {
    try {
      await dispatch(changePassword(values.newPassword))
      toast.success('Changed successful')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleSubmit}>
        {({isSubmitting, errors, touched}) => (
          <Form>
            {isSuccess && <div className={styles.successMessage}>{language.successMessage}</div>}
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">{language.newPassword}:</label>
              <Input
                type="password"
                id="newPassword"
                placeholder={language.newPassword}
                name="newPassword"
                className={
                  errors.newPassword && touched.newPassword
                    ? styles.inputForm_error
                    : styles.inputForm
                }
              />
              <Error name="newPassword" component="div" className={styles.errorMessage} />
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
