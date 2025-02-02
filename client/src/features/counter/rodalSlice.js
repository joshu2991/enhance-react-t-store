import { createSlice } from '@reduxjs/toolkit'

export const rodalSlice = createSlice({
  name: 'rodal',
  initialState: {
    visibility: false,
    passcode: 'not-yet-set',
    passcodeError: false,
    displayMsg: 'lalala',
  },
  reducers: {
    setPasscode: (state, action) => {
      state.passcode = action.payload;
    },
    setRodalVisiblity: (state, action) =>{
        state.visibility = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPasscode,setRodalVisiblity } = rodalSlice.actions

export default rodalSlice.reducer