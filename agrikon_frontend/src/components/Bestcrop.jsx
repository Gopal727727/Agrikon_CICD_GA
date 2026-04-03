import React from "react";
import "../css/bestcrop.css";

const BestCrop = () => {
  return (
    <div className="container-fluid best-crop-container py-4">
      <div className="row">
        {/* Left Side: Image */}
        <div className="col-lg-5 col-md-6 col-12 position-relative">
          <img
            src="/img/tractor.png"
            alt="Best Crop"
            className="img-fluid best-crop-image"
          />
        </div>

        {/* Right Side: Content */}
        <div className="col-lg-7 col-md-6 col-12 text-white ps-lg-4">
          {/* Logo and Welcome Message */}
          <div className="text-left">
            <img
              src="/img/tinylogo.png"
              alt="Artova Logo"
              className="artova-logo mb-2"
            />
            <p className="artova-text">Welcome to Artova</p>
          </div>

          {/* Heading and Subheading */}
          <h2 className="best-crop-heading">Best Cultivating Crops</h2>
          <p className="best-crop-subheading">
            These are the best growing crops all over Nepal
          </p>

          {/* Search Bar and Button */}
          <div className="d-flex align-items-center mb-4">
            <input
              type="text"
              placeholder="Search for the crops"
              className="form-control me-2 rounded-search"
            />
            <button className="btn rounded-button text-white">See All</button>
          </div>

          {/* Static Crop Grid. Make this dynamic by using a DB*/}
          <div className="row text-black">
            {/* Crop Entries */}
            {[...Array(6)].map((_, index) => (
              <div className="col-lg-4 col-md-6 col-12 mb-4" key={index}>
                <div className="crop-container">
                  <div className="crop-image">
                    <img
                      src="/img/rice.png"
                      alt="Crop"
                      className="img-fluid crop-img"
                    />
                  </div>
                  <div className="crop-info">
                    <h4 className="crop-name">Crop {index + 1}</h4>
                    <p className="crop-text">{(index + 1) * 10}% of total Ag</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCrop;
