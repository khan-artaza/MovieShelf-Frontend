import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovie } from "../store/action/trendingMovieAction";

import MarqImg from "../components/MarqImg";
import Pagination from "../components/PaginationUI";
import { Link } from "react-router-dom";
import FilmCard from "../components/FilmCard";



const Home = () => {

  const [randomIndex, setRandomIndex] = useState(()=> Math.floor(Math.random()*20));

  const [page, setPage] = useState(1)

  const trendingMovie = useSelector((state) => state.trendingMovie.data);
  const totalPages = useSelector((state)=>state.trendingMovie.totalPages)

 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingMovie(page));

    const intervalId = setInterval(() => {
      const val = Math.floor(Math.random() * 20);
      setRandomIndex(val);
      console.log(randomIndex); // ✅ log new value, not stale state
    }, 12000);

    return () => clearInterval(intervalId); //
  }, [page]);

  let secPartURL = trendingMovie[randomIndex]?.poster_path;
  const HeroPosterURL = `https://image.tmdb.org/t/p/original${secPartURL}`;

  if(trendingMovie){
    
    var render = trendingMovie.map((movie, index)=>{
      let secURL = movie?.poster_path;
      const posterURL = `https://image.tmdb.org/t/p/original${secURL}`;
  
      
      return  <FilmCard index={index} movie={movie} posterURL={posterURL}/>
  
    })
  }

  return (
    trendingMovie ? <div>
      <section className="hero transition-all duration-500 relative w-full">
        <img className="" src={HeroPosterURL} alt="movie poster" />

        

        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full flex flex-col items-center justify-center">
          <h1 className="sp-font text-8xl uppercase">
            Your Movie <br /> Your Shelf
          </h1>
          <p className="most-font w-[80%] font-medium text-lg special-color opacity-80">
            Discover, track, and explore the world of cinema—your way.
          </p>
        </div>

        <div className=" absolute h-full w-full bg-black opacity-75 bottom-0 z-20 inset-0"></div>

        <div className="border-[0.2px] border-zinc-500/40 w-[90%] left-1/2 -translate-x-1/2 absolute bottom-5 z-30 flex items-center gap-4 text-xl font-bold rounded-2xl px-4 py-2 bg-zinc-800/70 justify-between">
          <img
            className="w-20 aspect-square object-cover rounded-xl"
            src={HeroPosterURL}
            alt=""
          />
          <h2 className="font-mvt text-2xl">
            {trendingMovie[randomIndex]?.title}
          </h2>

         <Link to={`/infomovie/${trendingMovie[randomIndex]?.id}`} className="w-[22%]"><button className="text-xs px-1 w-full py-2 rounded-lg bg-sp-color">
            Explore
          </button></Link> 
        </div>
      </section>

      <section className="marq overflow-hidden mt-5 relative">
        <div
          className="marq-track"
        >
          <MarqImg imgPath="netflix.png" />
          <MarqImg imgPath="hotstar.png" />
          <MarqImg imgPath="apple-tv.png" />
          <MarqImg imgPath="prime-video.png" />
          {/* duplicate */}
          <MarqImg imgPath="netflix.png" />
          <MarqImg imgPath="hotstar.png" />
          <MarqImg imgPath="apple-tv.png" />
          <MarqImg imgPath="prime-video.png" />

        </div>
        <p className="text-center mt-4 mx-auto opacity-60 w-[70%]">
          Explore movies from all major OTT platforms
        </p>

        <div className="absolute top-0 w-[15%] h-[80%] bg-gradient-to-r from-[var(--bg-color)]  to-transparent"></div>
        <div className="absolute top-0 w-[15%] right-0 h-[80%] bg-gradient-to-l from-[var(--bg-color)]  to-transparent"></div>
      </section>

      <section className="bottom px-6 mt-8 pb-25">
        <h1 className="font-semibold text-2xl">Trending <span className="text-[var(--special-color)]">Now</span></h1>

        <div className="movie-container mt-5 grid grid-cols-2 gap-4">
         {render}
        </div>

        <div className="pgn w-full pb-12">
          {
            totalPages && <Pagination totalPages={totalPages}/>
          }
      
      </div>
      </section>

      
    </div> : <div className="else w-full h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
  );
};

export default Home;
