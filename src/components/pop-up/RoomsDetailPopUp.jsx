import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { TickIcon } from "../../utils/icons";
import { IoCloseSharp } from "react-icons/io5";

const RoomsDetailPopUp = () => {
  const {
    openRoomsDetailPopup,
    setOpenRoomsDetailPopup,
    roomName,
    roomDescription,
    roomAmenities,
  } = useContext(AuthContext);

  const handleClose = () => {
    setOpenRoomsDetailPopup(false);
  };
  return (
    <section
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          handleClose();
        }
      }}
      className={`fixed inset-0 flex items-center justify-center max-md:px-4 bg-black/50 backdrop-blur-md z-50 transition-all ease-in-out duration-500 ${openRoomsDetailPopup ? "visible opacity-100 scale-100" : "hidden opacity-0 scale-95"}`}
    >
      <div className="max-w-xl w-full bg-white p-6 space-y-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          <IoCloseSharp />
        </button>
        {roomName && (
          <h2 className="text-2xl font-bold  text-black">{roomName}</h2>
        )}
        <p className="text-black">{roomDescription}</p>
        <h3 className="text-xl text-black"> Amenities</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {roomAmenities?.map((item, index) => (
            <div key={index} className="flex items-center">
              <TickIcon />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsDetailPopUp;
