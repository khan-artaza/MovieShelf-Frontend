import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTVbyId, getTvRating } from "../store/action/movieByIdAction";
import { useDispatch, useSelector } from "react-redux";
import GenreButtons from "../components/GenreButtons";
import Overview from "../components/Overview";
import SeasonCard from "../components/SeasonCard";
import ProdComp from "../components/ProdComp";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
const InfoTV = () => {
  const tv = useSelector((state) => state.movieById.data);
  const imdb = useSelector((state) => state.movieById.imdbData);
  const dispatch = useDispatch();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hidWish, setHidWish] = useState("hidden");

  console.log(params.id);

  let name = "";

  useEffect(() => {
    dispatch(getTVbyId(params.id));

    if (name) {
      console.log(name);
      dispatch(getTvRating(name));
    }
  }, [tv.name]);

  console.log("NAME", name);

  if (tv) {
    console.log("ppp", tv);
    var backdropPoster = `https://image.tmdb.org/t/p/original${tv.backdrop_path}`;
    var secURL = tv?.poster_path;
    var posterURL = `https://image.tmdb.org/t/p/original${secURL}`;
    name = tv.name;

    var genreRender = tv.genres.map((gn, idx) => {
      return <GenreButtons gn={gn} idx={idx} />;
    });
  }

  if (imdb) {
    console.log(imdb);
  }

  function openWishlistCard(){
    setHidWish("block")

  }

  function toggleHandler() {
    setHidWish("hidden");
  }

  const wishlistHandler = async (data) => {
    console.log(data);
    const wishData = {
      isTv : true,
      movieId: tv.id,
      wishlistTitle: data.wishlistTitle,
    };
    try {
      const wishListRes = await toast.promise(
        axios.post("http://localhost:3000/movie/wishlist", wishData, {
          withCredentials: true,
        }),
        {
          pending: "wishlisting...",
          success: "Wishlist added successful!",
          error: "Wishlisting failed!",
        }
      );

      setHidWish("hidden");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      {tv && imdb ? (
        <div className="pb-25">
          <section className={hidWish}>
            <div className="wishTitleCard w-full backdrop-blur-md h-screen fixed z-50">
              <form
                onSubmit={handleSubmit(wishlistHandler)}
                className="w-[70%] flex flex-col gap-3 justify-center items-center px-8 py-16 bg-[var(--card-bg)] border-1 border-[var(--card-border)] rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <i
                  onClick={toggleHandler}
                  className="ri-close-large-line text-lg absolute top-2 right-3"
                ></i>
                <label
                  className="font-semibold text-xl font-mvt"
                  htmlFor="wishlist-title"
                >
                  Wishlist Title
                </label>
                <input
                  {...register("wishlistTitle", {
                    required: "Wishlist title is required.",
                  })}
                  className="border-none outline-none rounded py-2 text-center bg-[var(--card-border)]"
                  id="wishlist-title"
                  type="text"
                  placeholder="title of your wishlist"
                />
                <small className="mx-auto text-[var(--special-color)]">
                  {errors?.wishlistTitle?.message}
                </small>
                <button
                  className="bg-[var(--special-color)] px-4 py-2 rounded"
                  type="submit"
                >
                  Add to Wishlist
                </button>
              </form>
            </div>
          </section>
          <section className="w-full h-[50vh] relative">
            <img
              className=" w-full h-full object-cover"
              src={tv.backdrop_path ? backdropPoster : posterURL}
              alt=""
            />

            <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-black to-transparent"></div>

            <div className=" absolute bottom-3 w-full px-6 flex justify-between items-center">
              <div className="flex flex-col gap-2 items-start">
                <h2 className="opacity-50">{tv.number_of_seasons} Seasons</h2>
                <h1 className="text-4xl font-mvt font-black opacity-90">
                  {tv.name}
                </h1>
              </div>

              <button onClick={openWishlistCard}>
              <i className="ri-bookmark-2-fill text-3xl"></i>
            </button>
            </div>
          </section>

          <section className="rate relative py-2 px-4 flex justify-start items-center gap-12">
            <div className="imdb w-fit flex flex-col items-center py-2">
              <img className="w-10" src="/images/imdb.png" alt="" />
              <div className="rating flex items-center gap-1 w-fit">
                <i className="ri-star-s-fill text-yellow-400 text-xl"></i>
                {imdb.imdbRating ? (
                  <>
                    <h2 className="font-semibold">{imdb.imdbRating}</h2>

                    <span className="text-sm opacity-50 font-thin">/10</span>
                  </>
                ) : (
                  <small>N/A</small>
                )}
              </div>
            </div>

            <div className="year absolute right-5">
              <div className="font-semibold text-[var(--special-color)]">
                {imdb.year}
              </div>
            </div>
          </section>

          <section className="genre">
            <div className="genreButtons flex gap-4 flex-wrap px-6 py-4">
              {genreRender}
            </div>
          </section>
          <Overview movie={tv} />

          <section className="seasons px-4 mt-5">
            <h1 className=" text-2xl">Seasons</h1>

            <div className="seasonContainer mt-2 w-full overflow-x-auto flex items-center justify-between gap-2 ">
              {tv.seasons.map((tv, idx) => {
                if (tv.name !== "Specials") {
                  return <SeasonCard tv={tv} idx={idx} />;
                }
              })}
            </div>
          </section>

          <ProdComp movie={tv} />
        </div>
      ) : (
        <div className="else w-full h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default InfoTV;
