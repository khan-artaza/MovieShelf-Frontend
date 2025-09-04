import React from 'react'
import { Link } from 'react-router-dom'

const FilmCard = ({index, movie, posterURL }) => {
  return (
    <div key={index} className="movie-card relative w-full h-75 rounded-lg border-1 border-[var(--card-border)] bg-[var(--card-bg)] pb-3 pt-2 px-2">
    <img className="w-full rounded-t-lg h-45 object-cover" src={posterURL} alt="" />
    <div className="flex flex-col gap-4 justify-center items-start pl-2">
        {
            movie.title && (
                <h1 className="font-mvt text-xl font-semibold mt-1">{movie?.title.slice(0,20)}{movie?.title.length >19 ? "..." : ""}</h1>
                
            )
        }

        {
            movie.name && (
                <h1 className="font-mvt text-xl font-semibold mt-1">{movie?.name.slice(0,20)}{movie?.name.length >19 ? "..." : ""}</h1>
            )
        }
        {
            movie.title && (
                <Link to={`/infomovie/${movie.id}`}><button className="bg-[var(--special-color)] px-2 py-1 absolute bottom-4 rounded text-sm">Explore</button></Link>
            )
        }
        {
            movie.name && (
                <Link to={`/infotv/${movie.id}`}><button className="bg-[var(--special-color)] px-2 py-1 absolute bottom-4 rounded text-sm">Explore</button></Link>
            )
        }
   
    
    </div>
  </div>
  )
}

export default FilmCard
