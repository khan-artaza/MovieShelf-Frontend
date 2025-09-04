import axios from 'axios'
import { loadCast, loadImdbData, loadMovieById } from '../slice/movieByIdSlice';

export const getMovieById = (movie_id) => async(dispatch, getState) =>{

        try {
                const moviebyIdData = await axios.get(`https://movieshelf-backend.onrender.com/movie/id?query=${movie_id}`)
                dispatch(loadMovieById(moviebyIdData.data.movie))
        
                console.log(moviebyIdData.data.movie);
                console.log("artaza");
                return moviebyIdData.data.movie
    
        } catch (error) {
            console.log("error in fetching movie by id : ", error);
            
        }
    
} 


export const getCast = ( movie_id) => async(dispatch, getState) =>{

        try {
            const cast = await axios.get(`https://movieshelf-backend.onrender.com/movie/cast?query=${movie_id}`)
            
            dispatch(loadCast(cast.data.cast.cast))
            
        } catch (error) {
            console.log("error in fetching cast by id : ", error);
            
        }

} 

export const getImdbData = (imdb_id) => async(dispatch, getState) =>{
    
    
    try {
        if(imdb_id){

            const imdbdata = await axios.get(`https://movieshelf-backend.onrender.com/movie/rating?query=${imdb_id}`)
            
            dispatch(loadImdbData(imdbdata.data.data))
        }
        
        
    } catch (error) {
        console.log("error in fetching imdb data by imdb id : ", error);
        
    }
} 

export const getTVbyId = (tv_id) => async(dispatch, getState) =>{
    console.log("gggg");
    
    try {
        const tv = await axios.get(`https://movieshelf-backend.onrender.com/movie/tv/id?query=${tv_id}`)
        console.log(tv);
        dispatch(loadMovieById(tv.data.tv))
        
    } catch (error) {
        console.log("error in fetching tv by id data", error);
        
    }
} 

export const getTvRating = (name) => async(dispatch, getState) =>{
    try {
        if(name){

            const imdbdata = await axios.get(`https://movieshelf-backend.onrender.com/movie/tv/rating?query=${name}`)
            dispatch(loadImdbData(imdbdata.data.data))
            
        }else{
            console.log("TV Shows name is required");
            
        }
        
        
    } catch (error) {
        console.log("error in fetching imdb data by TV name : ", error);
        
    }
}

