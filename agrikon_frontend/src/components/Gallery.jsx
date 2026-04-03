import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/gallery.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Gallery() {
  const loggedin = true;
  const images = [
    "/gallery/img1.png",
    "/gallery/img2.png",
    "/gallery/img3.png",
    "/gallery/img4.png",
    "/gallery/img5.png",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [showCarousel, setShowCarousel] = useState(false);

  const handleImageClick = (image) => setSelectedImage(image);
  const handleCloseCarousel = () => setShowCarousel(false);

  return (
    <div style={{ backgroundColor: "#f0f8ff", width: "100%", padding: "0" }}>
      <div className="gallery-container">
        <div className="header">
          <h2><strong>Our Farming Experts</strong></h2>
        </div>

        <div className="content">
          <div className="left-column">
            <div className="image-container">
              <img src={selectedImage} alt="Selected" className="selected-image" />
              <div className="image-overlay">
                <h3>Image Heading</h3>
                <p>Image Description</p>
              </div>
            </div>
          </div>

          <div className="right-column">
            <small>Scroll here to view more</small>
            <div className="scrollable-images">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index}`}
                  className="thumbnail"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Modal */}
      {showCarousel && (
        <div className="carousel-modal">
          <div className="carousel-overlay" onClick={handleCloseCarousel}></div>
          <div className="carousel-content">
            <button className="close-button" onClick={handleCloseCarousel}>
              X
            </button>
            <Carousel
              showThumbs={false}
              showArrows={true}
              autoPlay={false}
              infiniteLoop={true}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
