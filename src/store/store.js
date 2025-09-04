import { configureStore } from '@reduxjs/toolkit'
import trendingMovieSlice from './slice/trendingMovieSlice'
import  movieByIdSlice  from './slice/movieByIdSlice'
import bollySlice from './slice/bollySlice'
import filmByGenreSlice from './slice/filmByGenreSlice'
import userSlice from './slice/userSlice'
import wishlistDataSlice from './slice/wishlistDataSlice'

export const store = configureStore({
  reducer: {
    trendingMovie : trendingMovieSlice,
    movieById : movieByIdSlice,
    bollywood : bollySlice,
    filmByGenre : filmByGenreSlice,
    user : userSlice,
    wishlist : wishlistDataSlice
  },
})