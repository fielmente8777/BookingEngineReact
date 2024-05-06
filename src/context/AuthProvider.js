import { createContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [serverUrl, setserverUrl] = useState("https://nexon.eazotel.com")



    const [openLoginPopup, setOpenLoginPopup] = useState(false)
    const [openRegisterPopup, setopenRegisterPopup] = useState(false)

    const [AllUserBookings, setAllUserBookings] = useState([])
    const [AllFutureUserBookings, setAllFutureUserBookings] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false)


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

            const json = await response.json()
            if (json.Status) {
                console.log(json.data)
                setAllUserBookings(json.data)
            }
            else {
                setAllUserBookings([])
            }
        }
        catch {
            console.log("Server Issue")
        }
    }

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

            const json = await response.json()
            if (json.Status) {
                console.log(json.data)
                setAllFutureUserBookings(json.data)
            }
            else {
                setAllFutureUserBookings([])
            }
        }
        catch {
            console.log("Server Issue")
        }
    }

    const DeleteUserBookings = async (bookingid) => {
        try {
            const response = await fetch(
                `${serverUrl}/feature1/cancelBookings/${localStorage.getItem("hotelid")}/${localStorage.getItem("hid")}/${localStorage.getItem("engineAuth")}/${bookingid}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json, text/plain, /",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "hotelid": localStorage.getItem("hid")
                    })
                }

            );

            const json = await response.json()
            if (json.Status) {
                console.log(json.data)
                setAllFutureUserBookings(json.data)
            }
            else {
                setAllFutureUserBookings([])
            }
        }
        catch {
            console.log("Server Issue")
        }
    }

    return (
        <AuthContext.Provider
            value={{
                openLoginPopup, setOpenLoginPopup, openRegisterPopup, setopenRegisterPopup, FetchUsersBookings,
                FetchUsersFutureBookings, AllUserBookings,
                AllFutureUserBookings, DeleteUserBookings,
                isMenuOpen, setIsMenuOpen
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
