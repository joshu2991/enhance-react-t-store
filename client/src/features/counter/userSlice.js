import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userid',
  initialState: {
    userId: 'not-yet-set'
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserId } = userSlice.actions

export default userSlice.reducer