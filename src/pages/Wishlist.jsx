import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistData } from "../store/action/wishlistDataAction";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();

  let wishlistData = useSelector((state) => state.wishlist.data);
  let grouped = "";
  let render = "";

  if (wishlistData) {
    console.log(wishlistData);

    grouped = wishlistData.reduce((acc, item) => {
      const title = item.wishlist.wishlistTitle;
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title].push(item);
      return acc;
    }, {});

    console.log(grouped);

    let arr = [];

    for (let key in grouped) {
      console.log(key, grouped[key]);
      arr.push(grouped[key]);
    }
    console.log(arr);

     render = arr.map((wishItem, id) => {
     
      return(
        <Link to={`/wishDetails/${wishItem[0].wishlist.wishlistTitle}`}><div key={id} className="wishlistCard w-fit px-2 flex flex-col justify-center items-center py-4">

        <img className='w-18' src="/images/wishlist.png" alt="" />
        <h2 className='text-lg'>{wishItem[0].wishlist.wishlistTitle}</h2>
        </div></Link>
      )
     
    });
  }

  useEffect(() => {
    dispatch(getWishlistData());
  }, []);

  return (
    <>
      <h2 className="font-mvt mt-20 font-bold text-4xl px-4">Your Wishlist</h2>
      {
      (wishlistData || wishlistData.length > 0)? <><div className="px-4 mt-5 items-center w-[90%] mx-auto flex flex-wrap gap-4">{render}</div></> : 
      <div className="flex flex-col w-[90%] mx-auto justify-center items-center pt-8 gap-4">
        <img className="w-[90%]" src="/images/empty.png" alt="" />
        <h2 className="text-4xl text-center font-semibold tracking-tight text-[var(--special-color)]">No items in your wishlisht!</h2>
      </div>
      }
      
    </>
  );
};

export default Wishlist;
