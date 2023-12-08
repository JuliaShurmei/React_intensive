import {createAsyncThunk} from '@reduxjs/toolkit'

export const getPublicNotes = createAsyncThunk('publicNotes/getPublicNotes', async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token was not provided')
  }

  const response = await fetch('https://dull-pear-haddock-belt.cyclic.app/notes?type=public', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch public notes')
  }

  const publicNotes = await response.json()
  return publicNotes
})
