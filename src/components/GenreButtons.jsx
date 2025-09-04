import React from 'react'

const GenreButtons = ({idx, gn}) => {
  return (
    <button
          key={idx}
          className="border bg-[#351d22] px-4 py-1 rounded-3xl text-[var(--special-color)] border-[var(--special-color)] "
        >
          {gn.name}
        </button>
  )
}

export default GenreButtons
