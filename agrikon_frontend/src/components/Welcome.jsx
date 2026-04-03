import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faLeaf, faSeedling } from "@fortawesome/free-solid-svg-icons";
import "../css/welcome.css";

const Welcome = () => {
  const headings = [
    "Best companion for all kinds of farmers",
    "Empowering farmers with modern solutions",
    "Grow smarter with AG Website",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="container text-center py-4 text-white" style={{ marginTop: "10vh" }}>
      {/* Top Text with Icons */}
      <div className="mb-4">
        <FontAwesomeIcon icon={faSeedling} size="lg" className="me-2" />
        <span className="text-uppercase">Welcome to AG Website Powered by Artova Solutions</span>
        <FontAwesomeIcon icon={faLeaf} size="lg" className="ms-2" />
      </div>

      {/* Carousel Section */}
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center justify-content-center gap-3">
          {/* Left Arrow */}
          <button
            className="carouselarrow"
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? headings.length - 1 : prev - 1))}
            style={{ position: "relative", zIndex: 10 , marginRight:'10%' }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </button>

          {/* Left Image */}
          <img src="/leftsideofgrain.png" alt="Left Decoration" className="img-fluid" style={{ width: "80px" }} />

          {/* Carousel for Heading */}
          <div className="carousel-container" style={{ maxWidth: "600px", width: "100%" }}>
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              infiniteLoop
              autoPlay={false} 
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)}
              transitionTime={600}
              swipeable
              emulateTouch
              className="text-carousel"
            >
              {headings.map((text, index) => (
                <div key={index}>
                  <h1
                    className="display-6 text-wrap text-center text-uppercase m-0"
                    style={{ fontSize: "clamp(1.5rem, 2vw, 2.5rem)" }}
                  >
                    {text}
                  </h1>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Right Image */}
          <img src="/rightsideofgrain.png" alt="Right Decoration" className="img-fluid" style={{ width: "80px" }} />

          {/* Right Arrow */}
          <button
            className="carouselarrow"
            onClick={() => setCurrentSlide((prev) => (prev === headings.length - 1 ? 0 : prev + 1))}
            style={{ position: "relative", zIndex: 10, marginLeft:'10%' }}
          >
            <FontAwesomeIcon icon={faArrowRight} size="lg" />
          </button>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-4">
        <button className="btn btn-orange hover-scale">Discover More</button>
      </div>

      {/* Trusted by Section */}
      <div className="mt-5" style={{ textAlign: "center" }}>
        <h5 className="text-white" style={{ textDecoration: "underline", textDecorationColor: "#ff8418" }}>
          Trusted By
        </h5>
        <div className="d-flex justify-content-center gap-4 mt-3">
          <img src="/img/google.png" alt="Google" className="img-fluid" style={{ width: "80px" }} />
          <img src="/img/amazon.png" alt="Amazon" className="img-fluid mt-2" style={{ width: "80px" }} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
