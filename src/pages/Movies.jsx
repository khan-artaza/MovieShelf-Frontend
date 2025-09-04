import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBollyData } from "../store/action/bollyaction";
import Pagination from "../components/PaginationUI";
import { getTrendingMovie } from "../store/action/trendingMovieAction";
import ZigZagCarousel from "../components/ZigZagCarousel";
import { useForm } from "react-hook-form";
import { geFilmByGenre } from "../store/action/filmByGenreAction";
import FilmCard from "../components/FilmCard";

const Movies = () => {
  const [filterData, SetFilterData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("filterData")) || {
        Mgenre: "28",
        Tgenre: "80",
        categ: "movie",
        industry: "hollywood",
      }
    );
  });

  const { register, handleSubmit, watch } = useForm(
    localStorage.getItem("filterData") && {
    defaultValues : JSON.parse(localStorage.getItem("filterData"))
   }
  );

  const submitHandler = (data) => {
    console.log(data);
    const { categ, Mgenre, Tgenre, industry } = data;
    localStorage.setItem("filterData", JSON.stringify(data));
    dispatch(geFilmByGenre(categ, Mgenre, Tgenre, industry,1));
  };

  const film = useSelector((state) => state.filmByGenre.data);

  const totalPages = useSelector((state)=> state.filmByGenre.totalPages)
  console.log(totalPages);
  
  

  if (film) {
    console.log("---->", film);

    var render = film.map((movie, index) => {
      if (movie.id !== 1141868) {
        const posterURL = `https://image.tmdb.org/t/p/original${movie?.poster_path}`;

        return <FilmCard index={index} movie={movie} posterURL={posterURL} />;
      }
    });
  }

  const [randomIndex, setRandomIndex] = useState(() =>
    Math.floor(Math.random() * 20)
  );

  // const [imgArr, setImgArr] = useState([])

  const random = Math.floor(Math.random() * 20);

  const dispatch = useDispatch();
  useEffect(() => {
    setRandomIndex(random);
    dispatch(getBollyData(1));
    dispatch(getTrendingMovie(1));

    dispatch(geFilmByGenre(filterData.categ, filterData.Mgenre, filterData.Tgenre, filterData.industry,1));
  }, []);

  

  const bollyMovie = useSelector((state) => state.bollywood.data);
  const trendingMovie = useSelector((state) => state.trendingMovie.data);

  // console.log("BM", bollyMovie);
  // console.log("TM", trendingMovie);

  if (bollyMovie && trendingMovie) {
    var imgArr = [];

    bollyMovie.forEach((bm) => {
      const topImg = `https://image.tmdb.org/t/p/original${bm.poster_path}`;
      // console.log(topImg);
      let id = bm.id;

      imgArr.push({ topImg, id });
    });

    trendingMovie.forEach((tm) => {
      var topImg = `https://image.tmdb.org/t/p/original${tm.poster_path}`;
      let id = tm.id;
      imgArr.push({ topImg, id });
    });

    // console.log(imgArr);
  }

  const category = watch("categ");

  return (
    <div className="pb-25">
      {bollyMovie && trendingMovie ? (
        <div className="if">
          <div className="top">
            <ZigZagCarousel arr={imgArr} interval={12000} />
          </div>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className=" px-4 flex flex-col gap-1 justify-center items-center"
          >
            <h1 className="text-2xl px-4 mt-4">
              Filters{" "}
              <span>
                <i className="ri-equalizer-line text-[var(--special-color)]"></i>
              </span>
            </h1>

            <div className="categoryBox flex items-center justify-between w-[70%] px-2  gap-2 py-1">
              <label
                className="font-semibold text-lg text-[var(--special-color)]"
                htmlFor="categ"
              >
                Category
              </label>
              <select
                className="bg-black/30 opacity-50 p-2 w-32 rounded border-none outline-none"
                id="categ"
                {...register("categ")}
              >
                <option
                  className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                  value="movie"
                >
                  Movies
                </option>
                <option
                  className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                  value="tv"
                >
                  TV Shows
                </option>
              </select>
            </div>

            {category === "tv" && (
              <div className="TVgenreBox flex items-center justify-between w-[70%] px-2 gap-2 py-1">
                <label
                  className="font-semibold text-lg text-[var(--special-color)]"
                  htmlFor="genre"
                >
                  Genre
                </label>
                <select
                  className="bg-black/30 opacity-50 p-2 w-40 rounded border-none outline-none"
                  id="genre"
                  {...register("Tgenre")}
                >
                  <option className="bg-[var(--card-bg)]" value={10759}>
                    Action & Adventure
                  </option>
                  <option className="bg-[var(--card-bg)]" value={16}>
                    Animation
                  </option>
                  <option className="bg-[var(--card-bg)]" value={35}>
                    Comedy
                  </option>
                  <option className="bg-[var(--card-bg)]" value={80}>
                    Crime
                  </option>
                  <option className="bg-[var(--card-bg)]" value={99}>
                    Documentary
                  </option>
                  <option className="bg-[var(--card-bg)]" value={18}>
                    Drama
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10751}>
                    Family
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10762}>
                    Kids
                  </option>
                  <option className="bg-[var(--card-bg)]" value={9648}>
                    Mystery
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10763}>
                    News
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10764}>
                    Reality
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10765}>
                    Sci-Fi & Fantasy
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10766}>
                    Soap
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10767}>
                    Talk
                  </option>
                  <option className="bg-[var(--card-bg)]" value={10768}>
                    War & Politics
                  </option>
                  <option className="bg-[var(--card-bg)]" value={37}>
                    Western
                  </option>
                </select>
              </div>
            )}

            {category === "movie" && (
              <div className="movieGenreBox flex items-center justify-between w-[70%] px-2  gap-2 py-1">
                <label
                  className="font-semibold text-lg text-[var(--special-color)]"
                  htmlFor="genre"
                >
                  Genre
                </label>
                <select
                  className="bg-black/30 opacity-50 p-2 w-32 rounded border-none outline-none"
                  id="genre"
                  {...register("Mgenre")}
                >
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={28}
                  >
                    Action
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={12}
                  >
                    Adventure
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={16}
                  >
                    Animation
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={35}
                  >
                    Comedy
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={80}
                  >
                    Crime
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={99}
                  >
                    Documentary
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={18}
                  >
                    Drama
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={10751}
                  >
                    Family
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={14}
                  >
                    Fantasy
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={36}
                  >
                    History
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={27}
                  >
                    Horror
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={10402}
                  >
                    Music
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={9648}
                  >
                    Mystery
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={10749}
                  >
                    Romance
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={878}
                  >
                    Science Fiction
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={10770}
                  >
                    TV Movie
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={53}
                  >
                    Thriller
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={10752}
                  >
                    War
                  </option>
                  <option
                    className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                    value={37}
                  >
                    Western
                  </option>
                </select>
              </div>
            )}

            <div className="industryBox flex items-center justify-between w-[70%] px-2  gap-2 py-1">
              <label
                className="font-semibold text-lg text-[var(--special-color)]"
                htmlFor="industry"
              >
                Industry
              </label>
              <select
                className="bg-black/30 opacity-50 p-2 w-32 rounded border-none outline-none"
                id="industry"
                {...register("industry")}
              >
                <option
                  className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                  value="hollywood"
                >
                  Hollywood
                </option>
                <option
                  className="bg-[var(--card-bg)] border-1 border-[bg-[var(--card-border)]]"
                  value="bollywood"
                >
                  Bollywood
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-[var(--special-color)] px-4 py-1 rounded font-semibold text-lg"
            >
              Apply
            </button>
          </form>

          <div className="film-container px-4  mt-5 grid grid-cols-2 gap-4">
            {render}
          </div>
          {
            totalPages && <Pagination totalPages={totalPages} filterData={filterData}/>
          }
        </div>
      ) : (
        <div className="else w-full h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Movies;
