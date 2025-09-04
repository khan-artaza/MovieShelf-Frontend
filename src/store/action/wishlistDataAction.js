import axios from "axios"
import { loadWishlistData } from "../slice/wishlistDataSlice";

export const getWishlistData = () => async(dispatch, getState) =>{
    try {
        const wishlistData = await axios.get("http://localhost:3000/movie/wishlist/get-all", {
            withCredentials: true
          })
        // console.log(wishlistData.data.wishlistData);
        dispatch(loadWishlistData(wishlistData.data.wishlistData))
        
    } catch (error) {
        console.log("error in fetching wishlist data : ", error);
        
    }
}