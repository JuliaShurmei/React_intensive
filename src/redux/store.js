import {configureStore} from '@reduxjs/toolkit'
import personalNotesReducer from './slices/noteSlice'
import publicNotesReducer from './slices/publicNotesSlice'
import userReducer from './slices/userSlice'
import changePasswordReducer from './slices/changePasswordSlice'

export const store = configureStore({
  reducer: {
    notes: personalNotesReducer,
    publicNotes: publicNotesReducer,
    user: userReducer,
    password: changePasswordReducer,
  },
})
