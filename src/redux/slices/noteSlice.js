import {createSlice} from '@reduxjs/toolkit'
import {getPersonalNotes} from '../middleware/personalNotesThunk'
import {addNote} from '../middleware/addNoteThunk'
import {deleteNote} from '../middleware/deleteNoteThunk'
import {updateNote} from '../middleware/editNoteThunk'
import {detailedNote} from '../middleware/detailedNoteThunk'

export const personalNotesSlice = createSlice({
  name: 'personalNotes',
  initialState: {
    notes: [],
    detailedNote: null,
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPersonalNotes.fulfilled, (state, action) => {
        state.notes = action.payload
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes = action.payload
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload)
      })
      .addCase(detailedNote.fulfilled, (state, action) => {
        state.detailedNote = action.payload
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.notes = state.notes.map(note =>
          note.id === action.payload.noteId ? {...note, ...action.payload.updatedNote} : note
        )
      })
  },
})

export const {setNotes, removeNote} = personalNotesSlice.actions

export default personalNotesSlice.reducer
