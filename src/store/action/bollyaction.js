import axios from "axios"
import { loadBollywood } from "../slice/bollySlice";

export const getBollyData = (page) => async(dispatch, getState) => {
    try {
        const bollyData = await axios.get(`http://localhost:3000/movie/bollywood?page=${page}`)
        // console.log(bollyData.data.bollyMovies);

        dispatch(loadBollywood(bollyData.data.bollyMovies))
        
    } catch (error) {
        console.log("error in fetching bollywood data : ",error);
        
    } 
}