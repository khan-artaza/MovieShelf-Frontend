import React from 'react'

const Overview = ({movie}) => {
  return (
    <section className="overview px-4 xl:mt-5 xl:px-12 sm:px-6">
        {movie ? (
          <>
            {" "}
            <h1 className="text-2xl sm:text-3xl">Storyline</h1>
            <p className="mt-2 text-sm opacity-50 sm:text-lg sm:leading-5">{movie.overview}</p>
          </>
        ) : (
          <small>Loading...</small>
        )}
      </section>
  )
}

export default Overview
