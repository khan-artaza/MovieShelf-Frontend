import axios from 'axios'
import { loadTP, loadTrndMovie } from '../slice/trendingMovieSlice';


export const getTrendingMovie = (page) => async(dispatch, getState) =>{
    try {
        const trMovie = await axios.get(`http://localhost:3000/movie/trending?page=${page}`)

        dispatch(loadTP(trMovie.data.totalPages))
        
        dispatch(loadTrndMovie(trMovie.data.trendingMovies))
        

    } catch (error) {
        console.error('error in fetching top-rated movies : ', error)
    }

}