import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Onhold = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh", 
        backgroundColor: "#d3d3d3", 
      }}
    >
      {/* Display the Nepal.svg */}
      <img 
        src="/svg/nepal.svg" 
        alt="Nepal SVG" 
        style={{ width: "90%", height: "60%" }}
      />
    </div>
  );
};

export default Onhold;
