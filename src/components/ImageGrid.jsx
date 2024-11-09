/* eslint-disable no-unused-vars */
import '../Components/ImageModal';
import 'react-lazy-load-image-component/src/effects/blur.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  FaBookmark,
  FaDownload,
  FaHeart,
} from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import ImageModal from '../Components/ImageModal';
import BookmarkModal from './BookmarkModal';

const ImageGrid = () => {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [likes, setLikes] = useState({});

  // Toggle bookmark modal
  const toggleBookmarkModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBookmarkModal(!showBookmarkModal);
  };

  // Shuffle images
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetch images from the mock API
  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/c9e44cea-0cd6-46c1-a5d2-baa63f3944f7") // Replace with your new API endpoint if different
      .then((response) => {
        setFilteredImages(shuffleArray(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  // Filter images based on search value
  useEffect(() => {
    if (searchValue) {
      setFilteredImages((prevImages) =>
        prevImages.filter((image) =>
          image.tag.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          )
        )
      );
    }
  }, [searchValue]);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  const toggleLike = (index) => {
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  return (
    <div className="px-4 grid-container bg-[#0f0f0f] lg:px-10 max-sm:px-4 md:px-10 xl:px-10 2xl:px-10">
      <div className="flex py-[40px] lg:py-[60px] flex-row content-center justify-between w-full">
        <h1 className="text-4xl font-medium text-white font-jakarta max-sm:hidden">
          Free Stock Photos
        </h1>
        <form className="w-full max-sm:max-w-md lg:max-w-lg md:max-w-sm">
          <div className="relative flex items-center">
            <FaMagnifyingGlass className="fa-solid absolute w-[13px] h-[13px] pointer-events-none ml-3 fa-beat-fade" />
            <input
              type="text"
              name="search"
              placeholder="Search Images..."
              autoComplete="off"
              className="w-full px-3 py-[10px] max-sm:py-[15px] pl-10 font-medium placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 font-sans"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-[30px] md:gap-[20px] max-sm:gap-[25px]">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full bg-gray-300 rounded-lg h-60"></div>
            </div>
          ))}
        </div>
      ) : (
        <ResponsiveMasonry>
          <Masonry columnsCount={3} gutter={15}>
            {filteredImages.map((image, index) => (
              <li
                key={index}
                className="relative list-none cursor-pointer"
                onClick={() => openModal(image)}
              >
                <LazyLoadImage
                  src={image.src}
                  alt={`frame${index}`}
                  className="w-auto h-auto cursor-pointer"
                />
                <div className="absolute inset-0 transition-opacity duration-300 bg-black bg-opacity-0 hover:bg-opacity-10">
                  <div className="flex items-center w-full h-full gap-2 transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <button
                      onClick={toggleBookmarkModal}
                      className="px-4 py-3 absolute top-3 right-[78px] text-[#ffffff] bg-black font-semibold flex items-center justify-center gap-2 bg-transparent rounded-lg border-[1px] hover:border-[#bfbdbd]"
                    >
                      <FaBookmark />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(index);
                      }}
                      className="px-4 py-3 text-[#000000] absolute top-3 right-5 bg-black font-semibold flex items-center justify-center gap-2 bg-transparent rounded-lg border-[1px] hover:border-[#bfbdbd]"
                    >
                      <FaHeart
                        className={
                          likes[index]
                            ? "fa-solid fa-heart text-red-500 heart-pulse"
                            : "fa-regular  text-white fa-heart"
                        }
                      />
                    </button>
                    <a
                      href={image.src}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center font-medium absolute bottom-5 right-5 max-sm:bg-transparent md:bg-[#ffffff] max-sm:text-[#ffffff] md:text-black md:rounded-lg md:py-3 md:px-3 md:hover:bg-[#ffffff] lg:bg-[#ef5350] lg:hover:bg-[#c85655] max-sm:hover:bg-[#ffffff] max-sm:hover:text-black max-sm:hover:rounded-lg max-sm:hover:px-3 max-sm:hover:py-3 lg:py-2 lg:px-3 lg:rounded-xl content-center justify-center gap-2 lg:text-[#ffffff]"
                    >
                      <FaDownload/>
                      <span className="hidden lg:inline">Download</span>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <ImageModal image={selectedImage} onClose={closeModal} />
      {showBookmarkModal && <BookmarkModal />}
    </div>
  );
};

export default ImageGrid;
