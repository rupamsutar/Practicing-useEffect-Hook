import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: null,
    onLogin: (email, password) => {},
    onLogout: () => {}
});

export const AuthContextProvider = (props) => {

    // State
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Effect 
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

        if (storedUserLoggedInInformation === "1") {
            setIsLoggedIn(true);
        };
    }, []);

    const loginHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    }

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
    }

    

    return (
        <AuthContext.Provider
            value = {{
                isLoggedIn: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
