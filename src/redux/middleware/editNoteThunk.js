import {createAsyncThunk} from '@reduxjs/toolkit'

export const updateNote = createAsyncThunk(
  'personalNotes/updateNote',
  async ({noteId, updatedData}, {rejectWithValue}) => {
    const token = localStorage.getItem('token')

    if (!token) {
      return rejectWithValue('Token not found')
    }

    try {
      const response = await fetch(`https://dull-pear-haddock-belt.cyclic.app/notes?id=${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        return rejectWithValue('Failed to update a note')
      }

      const updatedNote = await response.json()

      return {updatedNote, noteId: noteId}
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
