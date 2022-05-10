import { configureStore } from '@reduxjs/toolkit'
import numberSlice from '../features/number'
import loginSlice from '../features/login'
import carrelloSlice from '../features/carrello'
import carrello from '../features/carrello'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';  

const persistedState = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}


let store = configureStore({
  reducer: {
    number: numberSlice, 
    login: loginSlice,
    carrello: carrelloSlice
  },
  
  preloadedState: persistedState
})


store.subscribe(() => {
  let toSave = store.getState()
  let save = { ...toSave}
  localStorage.setItem('reduxState', JSON.stringify(save))
})

export default store