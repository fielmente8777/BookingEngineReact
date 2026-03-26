

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

const ImageSlider = ({imagesArray}) => {
  const {
    openImagePopup,
    setOpenImagePopup,
    currentImageIndex,
  } = useContext(AuthContext);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(currentImageIndex);
  }, [currentImageIndex]);
  // handle next & prev
  const handleNext = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % imagesArray.length);
  };

  const handlePrev = () => {
    setCurrentImage(
      (prevIndex) => (prevIndex - 1 + imagesArray.length) % imagesArray.length
    );
  };

  const handleClose = () => {
    setOpenImagePopup(false);
    setCurrentImage(0);
  };


  return (
    <section
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          handleClose();
        }
      }}
      className={`relative h-82`}
    >
      {/* number of images */}
      {/* <span className="text-xl text-white absolute top-4 left-5">
        {currentImage + 1}/{imagesArray.length}
      </span> */}
      {/* buttons next & prev */}
      <div className="absolute p-2 max-w-5xl w-full h-full md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 top-5  flex items-center md:justify-between gap-4 z-10">
        <button
          onClick={handlePrev}
          className="text-2xl text-white p-2 rounded-full bg-white/30"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="text-2xl text-white p-2 rounded-full bg-white/30"
        >
          <FaArrowRight />
        </button>
      </div>
      <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
        <div className="w-full h-full rounded-xl overflow-hidden">
          {/* <button
            onClick={() => handleClose()}
            className="absolute -top-16 right-8 text-2xl bg-white/10 shadow-inner text-white p-2 rounded-full flex items-center justify-center z-10"
          >
            <IoCloseSharp />
          </button> */}
          <img
            src={imagesArray[currentImage]}
            alt={imagesArray[currentImage]}
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;
