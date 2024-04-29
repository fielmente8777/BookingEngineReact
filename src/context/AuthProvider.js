import { createContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {



    const [openLoginPopup, setOpenLoginPopup] = useState(false)
    return (
        <AuthContext.Provider
            value={{
                openLoginPopup, setOpenLoginPopup
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
