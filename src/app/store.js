import { configureStore } from '@reduxjs/toolkit'
import numberSlice from '../features/number'
import loginSlice from '../features/login'

const persistedState = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}


let store = configureStore({
  reducer: {
    number: numberSlice, 
    login: loginSlice
  },
  
  preloadedState: persistedState
})


store.subscribe(() => {
  let toSave = store.getState()
  let save = { ...toSave}
  localStorage.setItem('reduxState', JSON.stringify(save))
})

export default store