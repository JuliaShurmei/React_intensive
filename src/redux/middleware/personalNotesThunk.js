import {createAsyncThunk} from '@reduxjs/toolkit'

export const getPersonalNotes = createAsyncThunk('personalNotes/getPersonalNotes', async () => {
  const token = localStorage.getItem('token')

  try {
    const response = await fetch('https://dull-pear-haddock-belt.cyclic.app/notes?type=personal', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch personal notes')
    }

    const personalNotes = await response.json()
    const privateNotes = personalNotes.filter(note => !note.isPublic)
    return privateNotes
  } catch (error) {
    throw new Error('Error')
  }
})
