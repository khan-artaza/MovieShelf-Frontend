import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovie } from "../store/action/trendingMovieAction";
import { geFilmByGenre } from "../store/action/filmByGenreAction";



export default function Pagination({totalPages ,filterData}) {
   
  if(filterData){
    var {categ, Mgenre, Tgenre, industry} = filterData
  }
    
  const [activePage, setActivePage] = useState(1);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTrendingMovie(activePage));
    if(filterData){
      dispatch(geFilmByGenre(categ, Mgenre, Tgenre, industry,activePage))
    }
    
  }, [activePage]);

  const handleClick = (page) => {
    localStorage.setItem("activePage", page)
    setActivePage(page);
  };

  const createPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Show left ellipsis if needed
    if (activePage > 4) {
      pages.push("...");
    }

    // Middle pages around active page
    const start = Math.max(2, activePage - 1);
    const end = Math.min(totalPages - 1, activePage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show right ellipsis if needed
    if (activePage < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
      {createPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && handleClick(page)}
          disabled={page === "..."}
          className={`px-3 py-1 rounded-md border font-semibold ${
            activePage === page
              ? "bg-[var(--card-bg)] text-[var(--special-color)]"
              : page === "..."
              ? "bg-transparent text-gray-500 cursor-default"
              : "bg-transparent text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
