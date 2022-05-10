import { createSlice } from '@reduxjs/toolkit'

export const carrello = createSlice({
  name: 'carrello',
  initialState: {
    carrello: [],
  },
  reducers: {
    setcarrello: (state, action) => {
      state.carrello = action.payload;
    },
    pushCarrello: (state, action)=>{
        if(!state.carrello.some(i=>i.menu.ID == action.payload.ID))
            state.carrello.push({menu: action.payload, count:1});
        else{
            state.carrello.map(i =>{
                if(i.menu.ID == action.payload.ID)
                    i.count++
                return i;
            })
        }
    },
    removeCarrello: (state, action) => {
        let filtrato = state.carrello.filter(i => i.menu.ID != action.payload)
        state.carrello = filtrato
    },
    EditCarrello:(state, action) =>{
        state.carrello.map(i => {
            if(i.menu.ID == action.payload.menu.ID){
                i.count = action.payload.count
            }
            return i
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCarrello, pushCarrello, removeCarrello, EditCarrello } = carrello.actions 

export default carrello.reducer