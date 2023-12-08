import {createSlice} from '@reduxjs/toolkit'
import {changePassword} from '../middleware/changePasswordThunk'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSuccess: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changePassword.fulfilled, state => {
      state.isSuccess = true
    })
  },
})

export default authSlice.reducer
