import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data : "",
    cast : [],
    imdbData : ""
  }

  export const movieByIdSlice = createSlice({
    name : "movieById",
    initialState,
    reducers : {
      loadMovieById : (state, action) =>{
        state.data = action.payload
      },
      loadCast : (state, action) =>{
        state.cast = action.payload 
      },
      loadImdbData : (state, action) =>{
        state.imdbData = action.payload
      }
    }
  })

  export const {loadMovieById, loadCast, loadImdbData} = movieByIdSlice.actions
  export default movieByIdSlice.reducer