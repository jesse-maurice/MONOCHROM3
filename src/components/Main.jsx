/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ImageGrid from './ImageGrid';
import Navbar from './Navbar';

const Main = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/c9e44cea-0cd6-46c1-a5d2-baa63f3944f7")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [images]);
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col w-full h-[700px] text-center bg-zinc-900/80">
        <div className="absolute top-0 left-0 w-full h-[700px] image-wrapper border-box"></div>
        {images.length > 0 && (
          <LazyLoadImage
            className="object-cover w-full h-full mix-blend-overlay"
            src={images[currentIndex].src}
            alt={images[currentIndex].description}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="flex flex-col text-center max-w-[600px] 2xl:max-w-[650px] max-sm:px-6 border-box pt-12"></div>
        </div>
      </div>
      <ImageGrid/>
    </>
  );
}

export default Main