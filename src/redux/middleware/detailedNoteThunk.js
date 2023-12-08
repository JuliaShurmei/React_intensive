import {createAsyncThunk} from '@reduxjs/toolkit'

export const detailedNote = createAsyncThunk(
  'personalNotes/detailedNote',
  async (noteId, {rejectWithValue}) => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`https://dull-pear-haddock-belt.cyclic.app/notes?id=${noteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete a note')
      }
      const detailedNoteData = await response.json()
      return {detailedNote: detailedNoteData}
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
