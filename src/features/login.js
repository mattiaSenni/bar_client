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
    logout: (state) => {
      state.login = null;
      state.token = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setlogin, logout } = login.actions 

export default login.reducer