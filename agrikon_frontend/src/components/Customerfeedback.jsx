import React, { useState,useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTractor, faSeedling } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CustomerFeedback = () => {

 const [feedbackData, setFeedbackData] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/feedback/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
          usertype: localStorage.getItem("usertype"),
          userid: localStorage.getItem("userid"),
        },
      });

      if (!response.ok) {
        alert("Failed to load feedback.");
        return;
      }

      const data = await response.json();
      console.log("Feedback loaded:", data);

      setFeedbackData(data);

    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("Error connecting to server.");
    }
  };

  // Fetch when component loads
  useEffect(() => {
    fetchFeedback();
  }, []);

const sliderSettings = {
  dots: true,
  infinite: feedbackData.length > 1,  // avoid looping for single feedback
  speed: 500,
  slidesToShow: Math.min(3, feedbackData.length),   // << FIX HERE
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: Math.min(2, feedbackData.length)
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ],
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />
};

  function CustomPrevArrow(props) {
    return (
      <button
        {...props}
        className="slick-arrow slick-prev"
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    );
  }

  function CustomNextArrow(props) {
    return (
      <button
        {...props}
        className="slick-arrow slick-next"
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    );
  }

  return (
    <>
     {feedbackData.length > 0 && (
      <div>
    <div className="container-fluid py-5 bg-light-green position-relative" style={{ backgroundColor: '#f5fff0' }}>
      
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-dark-green mb-3" style={{ fontSize: '2.5rem', color: '#2a5d34' }}>
            <FontAwesomeIcon icon={faTractor} className="me-3 text-warning" />
            What Farmers Say
          </h2>
          <p className="lead text-muted mb-0" style={{ fontSize: '1.25rem' }}>
            Join 10,000+ Agriculturists Transforming Their Harvests
          </p>
        </div>

        <Slider {...sliderSettings} className="farmers-slider">
          {feedbackData.map((feedback, index) => (
            <div key={index} className="px-2">
              <div className="card border-0 rounded-4 h-100 shadow-lg overflow-hidden bg-white">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <img
                      src={`http://localhost:8000${feedback.user.profile_picture}`}
                      alt={feedback.name}
                      className="rounded-circle me-3 border-3 border-success"
                      style={{ width: '70px', height: '70px' }}
                    />
                    <div>
                      <h5 className="mb-1 fw-bold" style={{ fontSize: '1.3rem' }}>{feedback.user.name}</h5>
                      <small className="text-muted">{feedback.user.usertype}</small>
                    </div>
                  </div>
                  <div className="mb-3" style={{ fontSize: '1.2rem' }}>
                    {feedback.rating.split("").map((star, index) => (
                      <span
                        key={index}
                        style={{
                          color: star === "★" ? "#ffc107" : "#d3d3d3", // filled yellow, empty gray
                          marginRight: "2px"
                        }}
                      >
                        {star}
                      </span>
                    ))}
                  </div>
                  <p className="card-text text-dark mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {feedback.feedback}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </div>
     )}
     </>
  );
};

export default CustomerFeedback;