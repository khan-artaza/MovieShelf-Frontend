import React from 'react'

const ProdComp = ({movie}) => {
  return (
    <section className="prodComp px-4 sm:px-6 pb-8 mt-5">
        <h1 className="text-2xl sm:text-3xl xl:mt-12 xl:px-8">Produced by</h1>
        <div className="container mt-4 flex justify-center items-center gap-6 flex-wrap">

            {
              movie ? <> 
              {movie.production_companies.map((comp, idx)=>{
                return comp.logo_path? <div key={idx} className="bg-white rounded-lg p-1"><img className="w-28" src={`https://image.tmdb.org/t/p/original${comp.logo_path}`} alt="" /></div> : <></>
              })}
              
              </> : <></>
            }
           
        </div>
      </section>
  )
}

export default ProdComp
