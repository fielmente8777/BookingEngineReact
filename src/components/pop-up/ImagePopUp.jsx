import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { IoCloseSharp } from "react-icons/io5";
import { GrNext } from "react-icons/gr";

const ImagePopUp = () => {
  const { openImagePopup, setOpenImagePopup, imagesArray, currentImageIndex } =
    useContext(AuthContext);
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
      className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 transition-all ease-in-out duration-500 ${openImagePopup ? "visible opacity-100 scale-100" : "hidden opacity-0 scale-95"}`}
    >
      {/* number of images */}
      <span className="text-xl text-white absolute top-4 left-5">
        {currentImage + 1}/{imagesArray.length}
      </span>
      {/* buttons next & prev */}
      <div className="absolute max-w-5xl w-full md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 top-5 left-5  flex items-center md:justify-between gap-4 z-10">
        <button
          onClick={handlePrev}
          className="text-2xl text-white p-2 rounded-full bg-white/30 rotate-180"
        >
          <GrNext />
        </button>
        <button
          onClick={handleNext}
          className="text-2xl text-white p-2 rounded-full bg-white/30"
        >
          <GrNext />
        </button>
      </div>
      <div className="w-full h-dvh relative flex items-center justify-center pointer-events-none">
        <div className="max-w-4xl w-full aspect-[4/2.5] relative">
          {/* close button */}
          <button
            onClick={() => handleClose()}
            className="absolute -top-16 right-8 text-2xl bg-white/10 shadow-inner text-white p-2 rounded-full flex items-center justify-center z-10"
          >
            <IoCloseSharp />
          </button>
          <img
            src={imagesArray[currentImage]}
            alt={imagesArray[currentImage]}
            className="w-full h-full object-contain absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
};

export default ImagePopUp;
