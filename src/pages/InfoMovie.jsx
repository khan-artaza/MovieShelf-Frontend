import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCast,
  getImdbData,
  getMovieById,
} from "../store/action/movieByIdAction";
import { useDispatch, useSelector } from "react-redux";
import GenreButtons from "../components/GenreButtons";
import Overview from "../components/Overview";
import ProdComp from "../components/ProdComp";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const InfoMovie = () => {
  const {register, handleSubmit, formState : {errors}} = useForm()
  const [hidWish, setHidWish] = useState("hidden")
  const params = useParams();
  let movie_id = params.id;

  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movieById.data);
  const cast = useSelector((state) => state.movieById.cast);
  const imdbData = useSelector((state) => state.movieById.imdbData);

  // console.log(imdbData);
  console.log(movie);

  function toggleHandler(){
    setHidWish("hidden")
  }

  if (movie) {
    // console.log(movie);
    var imdbId = movie.imdb_id;

    const minutes = movie.runtime; // 125
    const hours = Math.floor(minutes / 60); // 2
    const mins = minutes % 60; // 5
    var formatted = `${hours}h ${mins}m`;
  }

  function openWishlistCard(){
    setHidWish("block")

  }

  const wishlistHandler = async(data) =>{
    console.log(data);
    const wishData = {
      isTv : false,
      movieId : movie.id,
      wishlistTitle : data.wishlistTitle
    }
    try {

      const wishListRes = await toast.promise(
        axios.post("http://localhost:3000/movie/wishlist", wishData, { withCredentials: true }),
        {
          pending: "wishlisting...",
          success: "Wishlist added successful!",
          error: "Wishlisting failed!",
        }
      );

      setHidWish("hidden")
  
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
    
  }

  // console.log(movie_id);

  useEffect(() => {
    dispatch(getMovieById(movie_id));
    dispatch(getCast(movie_id));
    // console.log(imdbId);
    if (imdbId) {
      dispatch(getImdbData(imdbId));
      // console.log("eeee", imdbId);
    }
  }, [movie_id, imdbId]);

  let genreRender = "";
  let castRender = "";

  let backdropPoster = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  let secURL = movie?.poster_path;
  const posterURL = `https://image.tmdb.org/t/p/original${secURL}`;

  if (Array.isArray(cast) && cast.length > 0) {
    castRender = cast?.map((cst, idx) => {
      const profilePath = cst.profile_path;

      return (
        <div
          key={idx}
          className="castElem px-2 mt-2 w-[100px] shrink-0 flex flex-col items-center h-50 gap-1"
        >
          <img
            className="w-[80px] h-[80px] aspect-square object-cover object-top rounded-full"
            src={`https://image.tmdb.org/t/p/original${profilePath}`}
            alt=""
          />
          <h3 className="font-semibold text-sm max-w-[80px] text-center text-[var(--special-color)] whitespace-normal break-words leading-tight">
            {cst.name}
          </h3>
          <p className="text-center text-xs opacity-40 max-w-[80px] whitespace-normal break-words leading-tight">
            {cst.character}
          </p>
        </div>
      );
    });
  }

  if (movie && Array.isArray(movie.genres)) {
    genreRender = movie?.genres.map((gn, idx) => {
      return <GenreButtons idx={idx} gn={gn} />;
    });

    // console.log(genreRender);
    // console.log(backdropPoster);
  }

  

  

  return (
    <div className="pb-20">
      {movie ? (
        <>
        <section className={hidWish}>

        <div className="wishTitleCard w-full backdrop-blur-md h-screen fixed z-50">
          <form onSubmit={handleSubmit(wishlistHandler)} className="w-[70%] flex flex-col gap-3 justify-center items-center px-8 py-16 bg-[var(--card-bg)] border-1 border-[var(--card-border)] rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <i onClick={toggleHandler} className="ri-close-large-line text-lg absolute top-2 right-3"></i>
            <label className="font-semibold text-xl font-mvt" htmlFor="wishlist-title">Wishlist Title</label>
            <input {...register("wishlistTitle", {required : "Wishlist title is required."})} className="border-none outline-none rounded py-2 text-center bg-[var(--card-border)]" id="wishlist-title" type="text" placeholder="title of your wishlist"/>
            <small className="mx-auto text-[var(--special-color)]">{errors?.wishlistTitle?.message}</small>
            <button className="bg-[var(--special-color)] px-4 py-2 rounded" type="submit">Add to Wishlist</button>
          </form>
        </div>
        </section>
        <section className="w-full h-[50vh] relative">
          <img
            className=" w-full h-full object-cover"
            src={movie.backdrop_path ? backdropPoster : posterURL}
            alt=""
          />

          <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className=" absolute bottom-3 w-full px-6 flex justify-between items-center">
            <div className="flex flex-col gap-2 items-start">
              {formatted ? <h2 className="opacity-50">{formatted}</h2> : <></>}
              <h1 className="text-4xl font-mvt font-black opacity-90">
                {movie.title}
              </h1>
            </div>

            <button onClick={openWishlistCard}>
              <i className="ri-bookmark-2-fill text-3xl"></i>
            </button>
          </div>
        </section>
        </>
      ) : (
        <small>Loading...</small>
      )}

      <section className="rate relative py-2 px-4 flex justify-start items-center gap-12">
        <div className="imdb w-fit flex flex-col items-center py-2">
          <img className="w-10" src="/images/imdb.png" alt="" />
          <div className="rating flex items-center gap-1 w-fit">
            <i className="ri-star-s-fill text-yellow-400 text-xl"></i>
            {imdbData ? (
              <>
                <h2 className="font-semibold">
                  {imdbData ? (
                    imdbData.Ratings[0].Value.split("/")[0]
                  ) : (
                    <span className="opacity-50">N/A</span>
                  )}
                </h2>
                {imdbData.Ratings.length > 0 ? (
                  <span className="text-sm opacity-50 font-thin">/10</span>
                ) : (
                  ""
                )}
              </>
            ) : (
              <small> Loading...</small>
            )}
          </div>
        </div>
        <div className="tomato w-fit flex flex-col items-center py-2">
          <img className="w-10" src="/images/tomato.png" alt="" />
          {imdbData ? (
            <h2 className="font-semibold">
              {imdbData.Ratings.length > 1 ? (
                imdbData.Ratings[1].Value
              ) : (
                <span className="opacity-50">N/A</span>
              )}
            </h2>
          ) : (
            <small>Loading...</small>
          )}
        </div>

        <div className="year absolute right-5">
          {movie ? (
            <div className="font-semibold text-[var(--special-color)]">
              {movie.release_date.split("-")[0]}
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>

      <section>
        <div className="genreButtons flex gap-4 flex-wrap px-6 py-4">
          {genreRender}
        </div>
      </section>

      <Overview movie={movie} />

      <section className="cast px-4 mt-4">
        <h1 className="text-2xl">Cast</h1>

        <div className="cast-container flex whitespace-nowrap overflow-x-scroll justify-evenly items-center gap-5">
          {castRender}
        </div>
      </section>

      <ProdComp movie={movie} />
    </div>
  );
};
export default InfoMovie;
