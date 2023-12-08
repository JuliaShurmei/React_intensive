import {createSlice} from '@reduxjs/toolkit'
import {getPublicNotes} from '../middleware/publicNotesThunk'

export const publicNotesSlice = createSlice({
  name: 'publicNotes',
  initialState: {
    favFilter: false,
    favorites: {},
    notes: [],
  },
  reducers: {
    toggleFavFilter: state => {
      state.favFilter = !state.favFilter
    },
    addToFavorites: (state, action) => {
      const noteId = action.payload
      state.favorites[noteId] = !state.favorites[noteId]
    },
  },
  extraReducers: builder => {
    builder.addCase(getPublicNotes.fulfilled, (state, action) => {
      state.notes = action.payload
    })
  },
})

export const {toggleFavFilter, addToFavorites} = publicNotesSlice.actions

export default publicNotesSlice.reducer
