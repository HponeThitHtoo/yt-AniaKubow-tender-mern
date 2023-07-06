import React, { useState } from "react";
import { useCookies } from "react-cookie";

import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookies, removeCookie] = useCookies(["user"]);

  const authToken = cookies.AuthToken;

  const handleClick = () => {
    if (authToken) {
      removeCookie("UserId", cookies.UserId);
      removeCookie("AuthToken", cookies.AuthToken);
      window.location.reload();
      return;
    }

    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
      <Nav
        authToken={authToken}
        minimal={false}
        showModal={showModal}
        setShowModal={setShowModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Acount"}
        </button>
        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
