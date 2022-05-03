import { createSlice } from '@reduxjs/toolkit'

export const login = createSlice({
  name: 'login',
  initialState: {
    login: null,
    token: null
  },
  reducers: {
    setlogin: (state, action) => {
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setlogin } = login.actions

export default login.reducer