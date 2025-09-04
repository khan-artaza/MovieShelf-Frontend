import React from 'react';

const MarqImg = ({ imgPath }) => {
  return (
    <img
      src={`images/${imgPath}`}
      alt=""
      className="w-18 object-contain flex-shrink-0 sm:w-22"
    />
  );
};

export default MarqImg;

