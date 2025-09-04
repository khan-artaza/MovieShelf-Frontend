import React from 'react'

const SeasonCard = ({tv, idx}) => {

  return (
    <div key={idx} className="seasonCard shrink-0 relative flex gap-3 justify-between items-center text-sm w-[80%] sm:w-[60%] xl:w-1/3 p-1 h-28 border-1 border-[var(--card-border)] rounded-xl bg-[var(--card-bg)]">
                <img className="w-[30%] h-full object-cover object-top rounded-xl" src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} alt="" />
                <div className="w-[80%] h-full flex flex-col gap-0 justify-start">

                  <div className=" flex flex-col leading-none">
                  <h2 className="seasontitle text-lg font-semibold text-[var(--special-color)]">{tv.name}</h2>
                  <small className="text-[var(--special-color)] opacity-80 ">Total episodes : {tv.episode_count}</small>

                  </div>
                  <p className="overview mt-1 pb-2 leading-none font-thin text-xs overflow-y-auto opacity-40">
                    {tv.overview}
                  </p>

                  <h2 className="border absolute top-2 right-2 w-fit px-2 text-xs rounded-2xl text-[var(--special-color)] ">{tv.air_date? tv.air_date?.split("-")[0] : ""}</h2>
                </div>
              </div>
  )
}

export default SeasonCard
