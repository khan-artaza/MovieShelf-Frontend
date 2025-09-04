import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ZigZagCarousel = ({ arr, interval}) => {

  let images = arr.map((elem)=> elem.topImg)
  let id = arr.map((elem)=> elem.id)
  const {ordered} = createZigZagOrder(images, id);
  const {orderId} = createZigZagOrder(images, id);
  let orderedImages = ordered
  let orderedID = orderId
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === orderedImages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [orderedImages, interval]);

  // console.log(orderedID[currentIndex]);

  return (
      <Link to={`/infomovie/${orderedID[currentIndex]}`}>
    <div className="w-[100vw] sm:h-[60vh] relative flex justify-center items-center bg-black overflow-hidden">
      {
        orderedID[currentIndex] == 1141868 ?
        <img
      src={orderedImages[0]}
      alt={`slide-${currentIndex}`}
      className="w-full transition-all duration-700 ease-in-out"
    />
    :
        
      <img
        src={orderedImages[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="w-full transition-all duration-700 ease-in-out"
      />
      }
      

      <div className="absolute bottom-5 left-5 z-20 text-5xl opacity-60"><i className="ri-arrow-right-up-line"></i></div>

      <div className="absolute w-full h-full bottom-0 bg-gradient-to-t from-black/90 to-transparent"></div>
    </div>
    </Link>
  );
};

// Helper function
function createZigZagOrder(images, id) {
  const ordered = [];
  const orderId = []
  let left = 0;
  let right = images.length - 1;
  let toggle = true;

  while (left <= right) {
    if (toggle) {
      ordered.push(images[left]);
      orderId.push(id[left])
      left++;
    } else {
      ordered.push(images[right]);
      orderId.push(id[right])
      right--;
    }
    toggle = !toggle;
  }
  return {ordered, orderId};
}

export default ZigZagCarousel;
