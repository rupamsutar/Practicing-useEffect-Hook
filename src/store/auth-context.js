import React, { useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email,pass) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storageLoggedInInformation = localStorage.getItem("isLoggedIn");

        if (storageLoggedInInformation === "1") {
            setIsLoggedIn(true);
        }
    }, [])


    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };



    return (
        <AuthContext.Provider 
            value = { 
                {
                    isLoggedin: isLoggedIn,
                    onLogin: loginHandler,
                    onLogout: logoutHandler
                }
            }
        > 
            {props.children} 
        </AuthContext.Provider>
    )
}

export default AuthContext;
