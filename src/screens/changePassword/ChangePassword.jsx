// ChangePassword.jsx
import {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import styles from './ChangePassword.module.scss'

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export const ChangePassword = () => {
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
        <Form>
          {isSuccess && <div className={styles.successMessage}>Password successfully changed!</div>}

          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <Field type="password" id="currentPassword" name="currentPassword" />
            <ErrorMessage name="currentPassword" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <Field type="password" id="newPassword" name="newPassword" />
            <ErrorMessage name="newPassword" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.submitButton}>
            Change Password
          </button>
        </Form>
      </Formik>
    </div>
  )
}
