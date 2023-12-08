import {createAsyncThunk} from '@reduxjs/toolkit'

export const addNote = createAsyncThunk(
  'personalNotes/addNote',
  async (noteData, {rejectWithValue}) => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('https://dull-pear-haddock-belt.cyclic.app/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteData),
      })

      if (!response.ok) {
        throw new Error('Failed to add a note')
      }

      const responseData = await response.json()
      return responseData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
