import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  console.log("App Started -------------------")

  useEffect(() => {
  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  console.log("useEffect Started");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
      console.log("useEffect-If-statement-started");
      console.log(`logged in effect : ${isLoggedIn}`);
    }
    
  },[]);




  const loginHandler = (email, password) => {
    console.log("LoginHandler started------------------")
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      {console.log("Fragment started !")}
      {console.log(isLoggedIn)}
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      {console.log("Fragment ended !")}
    </React.Fragment>
  );
}

export default App;
