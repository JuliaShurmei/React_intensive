import {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const Auth = ({children}) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token && location.pathname !== '/') {
      navigate('/')
    }
  }, [location.pathname, navigate])

  return <>{children}</>
}

export default Auth
