import {loginSuccess} from './userSlice'
export const loginUser = (username, password) => async dispatch => {
  const data = {
    username,
    password,
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
    dispatch(loginSuccess())

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
