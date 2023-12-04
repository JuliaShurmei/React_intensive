import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: state => {
      state.isAuthenticated = true
    },
  },
})

export const {loginSuccess} = userSlice.actions
export default userSlice.reducer
