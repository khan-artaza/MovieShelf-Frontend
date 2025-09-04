import axios from "axios"
import { loadUser } from "../slice/userSlice";

export const getUser = () => async(dispatch, getState) => {
    try {
        const userRes = await axios.get("https://movieshelf-backend.onrender.com/user/profile", {
            withCredentials: true
          })
        console.log(userRes.data.user);
        dispatch(loadUser(userRes.data.user))
        localStorage.setItem("loggedInUser", JSON.stringify(userRes.data.user))
        
    } catch (error) {
        dispatch(loadUser(null))
        localStorage.setItem("loggedInUser", null)
        console.log("not able to fetch user", error);
    }
}

export const logoutUser = () => async(dispatch, getState) => {
    try {
        const logoutRes = await axios.post("https://movieshelf-backend.onrender.com/auth/logout", {}, {withCredentials : true})
        
        console.log(logoutRes);
        
        dispatch(loadUser(null))
        localStorage.setItem("loggedInUser", null)
    } catch (error) {
        console.log(error);
        
    }
}