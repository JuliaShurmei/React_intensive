import {createAsyncThunk} from '@reduxjs/toolkit'

export const deleteNote = createAsyncThunk(
  'personalNotes/deleteNote',
  async (noteId, {rejectWithValue}) => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`https://dull-pear-haddock-belt.cyclic.app/notes?id=${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete a note')
      }
      return {deletedNoteId: noteId}
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
