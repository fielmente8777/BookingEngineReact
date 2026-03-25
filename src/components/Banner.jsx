import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Banner = ({ websiteData }) => {
  const { setOpenImagePopup, setCurrentImageIndex, setImagesArray } =
    useContext(AuthContext);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const hid = queryParams.get("hid");
  console.log("hid", hid);

  const selectedData = websiteData?.[hid];

  const gridPattern = [
    "col-span-2 row-span-1",
    "col-span-4 row-span-2",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
  ];

  // open popup
  const handleClick = ({ images, index }) => {
    setOpenImagePopup(true);
    setImagesArray(images);
    setCurrentImageIndex(index);
  };

  return (
    <div className="max_screen_width">
      <div className="grid grid-cols-8 auto-rows-[18rem] grid-flow-row overflow-hidden gap-1">
        {selectedData?.Gallery[0]?.Images.slice(0, 5).map((item, index) => (
          <div
            onClick={() =>
              handleClick({ images: selectedData?.Gallery[0]?.Images, index })
            }
            key={index}
            className={`w-full aspect-auto h-full relative overflow-hidden cursor-pointer ${gridPattern[index % gridPattern.length]}`}
          >
            <img
              src={item}
              alt={item.alt}
              className={`w-full cursor-pointer object-cover hover:scale-110 duration-1000 transition ease-linear absolute inset-0 h-full`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
