import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data : ""
}

export const wishlistDataSlice = createSlice({
    name : "wishlistData",
    initialState,
    reducers : {
        loadWishlistData : (state, action) =>{
            state.data = action.payload
          }
    }
})

export const {loadWishlistData} = wishlistDataSlice.actions
export default wishlistDataSlice.reducer