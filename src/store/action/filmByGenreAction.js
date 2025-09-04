import axios from 'axios'
import { loadGenreFilm, loadGenreTP } from '../slice/filmByGenreSlice';

export const geFilmByGenre = (categ, Mgenre, Tgenre, industry, page) => async(dispatch, getState) => {
    if(categ == "movie" && industry == "hollywood"){
        try {
            const movieData = await axios.get(`https://movieshelf-backend.onrender.com/movie/genre/?genreId=${Mgenre}&page=${page}`)

            console.log(movieData);
            dispatch(loadGenreTP(movieData.data.totalPages))
            dispatch(loadGenreFilm(movieData.data.movies))
        } catch (error) {
            console.log("error in fetching hollywood movie by genre Data", error);
            
        }
    }

    if(categ == "tv" && industry == "hollywood"){
        try {
            const TVData = await axios.get(`https://movieshelf-backend.onrender.com/movie/tv/?genreId=${Tgenre}&page=${page}`)
                console.log(TVData);
                dispatch(loadGenreTP(TVData.data.totalPages))
                dispatch(loadGenreFilm(TVData.data.tv))
        } catch (error) {
            console.log("error in fetching hollywood TV Show by genre Data", error);
        }
    }

    if(categ == "movie" && industry == "bollywood"){
        try {
            const movieData = await axios.get(`https://movieshelf-backend.onrender.com/movie/bollywood/genre?genreId=${Mgenre}&page=${page}`)

            console.log(movieData);
            dispatch(loadGenreTP(movieData.data.totalPages))
            dispatch(loadGenreFilm(movieData.data.movies))
        } catch (error) {
            console.log("error in fetching bollywood movie by genre Data", error);
            
        }
    }

    if(categ == "tv" && industry == "bollywood"){
        try {
            const TVData = await axios.get(`https://movieshelf-backend.onrender.com/movie/tv/indian?genreId=${Tgenre}&page=${page}`)
                console.log(TVData);
                dispatch(loadGenreTP(TVData.data.totalPages))
                dispatch(loadGenreFilm(TVData.data.tv))
        } catch (error) {
            console.log("error in fetching bollywood TV Show by genre Data", error);
        }
    }


}