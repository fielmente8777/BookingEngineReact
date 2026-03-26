import { createContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [serverUrl, setserverUrl] = useState("https://nexon.eazotel.com");

  // open image in popup
  const [openImagePopup, setOpenImagePopup] = useState(false);
  // set images array in popup
  const [imagesArray, setImagesArray] = useState([]);
  // set current image index in popup
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // set rooms detail in popup
  const [openRoomsDetailPopup, setOpenRoomsDetailPopup] = useState(false);
  
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomAmenities, setRoomAmenities] = useState([]);

  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openRegisterPopup, setopenRegisterPopup] = useState(false);

  const [AllUserBookings, setAllUserBookings] = useState([]);
  const [AllFutureUserBookings, setAllFutureUserBookings] = useState([]);
  const [userInfo, setuserInfo] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [Button_color, setButton_color] = useState("#0A3A75");
  const [Bg_color, setBg_color] = useState("#153B5B");

  const FetchUsersInfo = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/feature1/getUserByPhoneNo/${localStorage.getItem("engineAuth")}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (json.Status) {
        console.log(json.user);
        setuserInfo(json.user);
      } else {
        setuserInfo({});
      }
    } catch {
      console.log("Server Issue");
    }
  };

  const FetchUsersBookings = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/feature1/getPrevBookings/${localStorage.getItem("hotelid")}/${localStorage.getItem("hid")}/${localStorage.getItem("engineAuth")}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (json.Status) {
        console.log(json.data);
        setAllUserBookings(json.data);
      } else {
        setAllUserBookings([]);
      }
    } catch {
      console.log("Server Issue");
    }
  };

  const FetchUsersFutureBookings = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/feature1/getFutureBookings/${localStorage.getItem("hotelid")}/${localStorage.getItem("hid")}/${localStorage.getItem("engineAuth")}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      if (json.Status) {
        console.log(json.data);
        setAllFutureUserBookings(json.data);
      } else {
        setAllFutureUserBookings([]);
      }
    } catch {
      console.log("Server Issue");
    }
  };

  const DeleteUserBookings = async (bookingid) => {
    try {
      const response = await fetch(
        `${serverUrl}/feature1/cancelBooking/${localStorage.getItem("hotelid")}/${localStorage.getItem("hid")}/${localStorage.getItem("engineAuth")}/${bookingid}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, /",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const json = await response.json();
      if (json.Status) {
        console.log(json.data);
        FetchUsersBookings();
        FetchUsersFutureBookings();
      } else {
        setAllFutureUserBookings([]);
      }
    } catch {
      console.log("Server Issue");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        openRoomsDetailPopup,
        setOpenRoomsDetailPopup,
        roomName,
        setRoomName,
        roomDescription,
        setRoomDescription,
        roomAmenities,
        setRoomAmenities,
        openImagePopup,
        setOpenImagePopup,
        imagesArray,
        setImagesArray,
        currentImageIndex,
        setCurrentImageIndex,
        openLoginPopup,
        setOpenLoginPopup,
        openRegisterPopup,
        setopenRegisterPopup,
        FetchUsersBookings,
        FetchUsersFutureBookings,
        AllUserBookings,
        AllFutureUserBookings,
        DeleteUserBookings,
        isMenuOpen,
        setIsMenuOpen,
        userInfo,
        setuserInfo,
        FetchUsersInfo,
        Button_color,
        setButton_color,
        Bg_color,
        setBg_color,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
