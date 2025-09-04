import React from 'react'

const Overview = ({movie}) => {
  return (
    <section className="overview px-4">
        {movie ? (
          <>
            {" "}
            <h1 className="text-2xl">Storyline</h1>
            <p className="mt-2 text-sm opacity-50">{movie.overview}</p>
          </>
        ) : (
          <small>Loading...</small>
        )}
      </section>
  )
}

export default Overview
