import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data : "",
    totalPages : 1
  }

  export const bollySlice = createSlice({
    name : "bollywood",
    initialState,
    reducers : {
      loadBollywood : (state, action) =>{
        state.data = action.payload
      },
      loadBollyTP : (state, action) =>{
        state.cast = action.payload 
      },
    }
  })

  export const {loadBollywood, loadBollyTP} = bollySlice.actions
  export default bollySlice.reducer