import axios from "axios"
import { loadBollywood } from "../slice/bollySlice";

export const getBollyData = (page) => async(dispatch, getState) => {
    try {
        const bollyData = await axios.get(`https://movieshelf-backend.onrender.com/movie/bollywood?page=${page}`)
        // console.log(bollyData.data.bollyMovies);

        dispatch(loadBollywood(bollyData.data.bollyMovies))
        
    } catch (error) {
        console.log("error in fetching bollywood data : ",error);
        
    } 
}