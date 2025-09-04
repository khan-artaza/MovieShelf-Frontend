import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const WishlistDetails = () => {
  const { wishTitle } = useParams();
const navigate = useNavigate()

  console.log(wishTitle);
  let filmList = "";
    
  let wishlistData = useSelector((state) => state.wishlist.data);

  let filmIdArr = [];
  let tVIdArr = []
  const [filmArr, setFilmArr] = useState([]);

  const oneDeleteHandler = async (movieId) => {
    const data = { movieId: movieId };
    try {
      await toast.promise(
        axios.delete(`https://movieshelf-backend.onrender.com/movie/wishlist/delete?movieId=${movieId}`, {
          data : data,
          withCredentials: true,
        }),
        {
          pending: "Deleting movie from wishlist...",
          success: "Movie deleted successfully from wishlist !",
          error: "Deleting failed!",
        }
      );
     navigate(-1)
      

    } catch (error) {
      toast.error("error in deleting from wishlist");
    }
  };

  const getMovieById = async (movie_id) => {
    try {
      const moviebyIdData = await axios.get(
        `https://movieshelf-backend.onrender.com/movie/id?query=${movie_id}`
      );

      return moviebyIdData.data.movie;
    } catch (error) {
      console.log("error in fetching movie by id : ", error);
    }
  };

  const getTvById = async (movie_id) => {
    try {
      const moviebyIdData = await axios.get(
        `https://movieshelf-backend.onrender.com/movie/tv/id?query=${movie_id}`
      );

      return moviebyIdData.data.tv;
    } catch (error) {
      console.log("error in fetching movie by id : ", error);
    }
  };

  

  if (wishlistData) {
        filmList = wishlistData.filter(
            (obj) => obj.wishlist.wishlistTitle == wishTitle
        );
          console.log(filmList);
      
          filmList.forEach((obj) => {

              
              if(obj.wishlist.isTv){
                    let tv = obj.wishlist.movieId;
                    tVIdArr.push(tv);
                }else{
                    
                    let film = obj.wishlist.movieId;
                    filmIdArr.push(film);
                }

          });
  }



  console.log(filmIdArr);
  console.log(tVIdArr);
  


    useEffect(() => {

            async function fetchFilms() {
                try {
                  const films = await Promise.all(
                    filmIdArr.map((filmId) => getMovieById(filmId))
                  );
        
                  console.log(films); // saari movies ka data
                  setFilmArr(films); // ek hi baar state update
                } catch (error) {
                  console.error("Error fetching films:", error);
                }
              }
              fetchFilms();
        


            async function fetchTV() {
                try {
                  const films = await Promise.all(
                    tVIdArr.map((filmId) => getTvById(filmId))
                  );
        
                  console.log(films); // saari movies ka data
                  setFilmArr(films); // ek hi baar state update
                } catch (error) {
                  console.error("Error fetching films:", error);
                }
              }
              fetchTV();
  
      
    },[]);


  console.log(filmArr);

  if (filmArr.length > 0) {
    
    var render = filmArr.map((movie, id) => {
      const posterURL = `https://image.tmdb.org/t/p/original${movie?.poster_path}`;
      return (
        <div
          key={id}
          className="movie-card xl:w-1/4 relative w-full h-75 rounded-lg border-1 border-[var(--card-border)] bg-[var(--card-bg)] pb-3 pt-2 px-2"
        >
          <i
            onClick={()=>oneDeleteHandler(movie.id)}
            className="ri-delete-bin-6-line text-[var(--special-color)] absolute bottom-3 text-2xl right-3"
          ></i>
          <img
            className="w-full rounded-t-lg h-45 object-cover"
            src={posterURL}
            alt=""
          />
          <div className="flex flex-col gap-4 justify-center items-start pl-2">
            {movie.title && (
              <h1 className="font-mvt text-xl font-semibold mt-1">
                {movie?.title.slice(0, 20)}
                {movie?.title.length > 19 ? "..." : ""}
              </h1>
            )}

            {movie.name && (
              <h1 className="font-mvt text-xl font-semibold mt-1">
                {movie?.name.slice(0, 20)}
                {movie?.name.length > 19 ? "..." : ""}
              </h1>
            )}
            {movie.title && (
              <Link to={`/infomovie/${movie.id}`}>
                <button className="bg-[var(--special-color)] px-2 py-1 absolute bottom-4 rounded text-sm">
                  Explore
                </button>
              </Link>
            )}
            {movie.name && (
              <Link to={`/infotv/${movie.id}`}>
                <button className="bg-[var(--special-color)] px-2 py-1 absolute bottom-4 rounded text-sm">
                  Explore
                </button>
              </Link>
            )}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="xl:px-12">
      <h3 className="text-5xl font-mvt font-semibold mt-20 xl:mt-30 px-4 ">
        {wishTitle}
      </h3>

      {
        filmArr? <>
        <div className="w-full pb-26 grid grid-cols-2 gap-2 px-4 mt-5">{render}</div>
      </> : <><div className="else w-full h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div></>}
        
    </div>
  );
};

export default WishlistDetails;
