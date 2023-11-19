import {useState} from 'react'
import {Formik, Form} from 'formik'
import {Input} from '../../components/input/Input'
import {Error} from '../../components/error/Error'
import {Button} from '../../components/button/Button'
import {Schema} from '../../validators/Schema'
import img01 from '../../../public/img-01.webp'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {FaEnvelope} from 'react-icons/fa'
import {RiLock2Line} from 'react-icons/ri'
import './Login.scss'

export const Login = () => {
  const [type, setType] = useState(false)
  const toggleBtn = () => {
    setType(prevType => !prevType)
  }
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-image">
          <img src={img01} alt="image"></img>
        </div>
        <div className="login-form">
          <span className="login-title"> Welcome Back</span>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Schema}
            onSubmit={values => {
              // Handle submitting
              console.log(values)
            }}>
            {({isSubmitting}) => (
              <Form>
                <div className="form-group">
                  <Input
                    className="input-form"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter you email"
                  />
                  <span className="symbol-input100">
                    <FaEnvelope />
                  </span>
                  <Error name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <Input
                    className="input-form"
                    type={type ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter you password"
                  />
                  <span className="focus-input100">
                    <RiLock2Line />
                  </span>
                  <span className="btn" onClick={toggleBtn}>
                    {type ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                  <Error name="password" component="div" className="error-message" />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  value="Login"
                  className="btn-submit"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
