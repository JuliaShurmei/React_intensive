import {createSlice} from '@reduxjs/toolkit'

export const personalNotesSlice = createSlice({
  name: 'personalNotes',
  initialState: {
    notes: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
  },
})

export const {setNotes} = personalNotesSlice.actions

export default personalNotesSlice.reducer
