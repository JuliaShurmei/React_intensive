import {createAsyncThunk} from '@reduxjs/toolkit'

export const changePassword = createAsyncThunk(
  'changePassword/changePassword',
  async newPassword => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`https://dull-pear-haddock-belt.cyclic.app/auth`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({password: newPassword}),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      return response.json()
    } catch (error) {
      throw error.message
    }
  }
)
