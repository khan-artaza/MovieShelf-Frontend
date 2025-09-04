import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data : "",
    totalPages : 1
  }

  export const filmByGenreSlice = createSlice({
    name : "filmByGenre",
    initialState,
    reducers : {
      loadGenreFilm : (state, action) =>{
        state.data = action.payload
      },

      loadGenreTP : (state, action)=>{
        state.totalPages = action.payload
      }
    }
  })

  export const {loadGenreFilm, loadGenreTP} = filmByGenreSlice.actions
  export default filmByGenreSlice.reducer