import {configureStore} from '@reduxjs/toolkit'
import noteReducer from './noteSlice'
import publicNotesReducer from './publicNotesSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    publicNotes: publicNotesReducer,
    user: userReducer,
  },
})
