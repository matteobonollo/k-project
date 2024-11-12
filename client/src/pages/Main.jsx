import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../assets/animations/Animation.json";

import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate(); 

  const handleViewCollectionClick = () => {
    navigate("/collection"); 
  };
  return (
    <>
      <div className="Main">
        <header className="Main-header">
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: 300, height: 300 }}
          />

          <button
            className="Main-button font-bold text-2xl"
            onClick={handleViewCollectionClick}
          >
            VISITA LO STORE
          </button>
        </header>
      </div>
    </>
  );
}

export default Main;
