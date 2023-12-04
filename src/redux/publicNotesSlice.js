import {createSlice} from '@reduxjs/toolkit'

export const publicNotesSlice = createSlice({
  name: 'publicNotes',
  initialState: {
    favFilter: false,
    favorites: {},
    notes: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    toggleFavFilter: state => {
      state.favFilter = !state.favFilter
    },
    addToFavorites: (state, action) => {
      const noteId = action.payload
      state.favorites[noteId] = !state.favorites[noteId]
    },
  },
})

export const {toggleFavFilter, addToFavorites, setNotes} = publicNotesSlice.actions

export default publicNotesSlice.reducer
