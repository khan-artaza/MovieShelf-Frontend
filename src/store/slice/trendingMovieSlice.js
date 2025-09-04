import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data : "",
    totalPages : 1
  }

  export const trendingMovieSlice = createSlice({
    name : "trendingMovie",
    initialState,
    reducers : {
      loadTrndMovie : (state, action) =>{
        state.data = action.payload
      },

      loadTP : (state, action)=>{
        state.totalPages = action.payload
      }
    }
  })

  export const {loadTrndMovie, loadTP} = trendingMovieSlice.actions
  export default trendingMovieSlice.reducer