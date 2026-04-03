import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/feedback.css";
import { useDispatch, useSelector } from "react-redux";
import { validatelogin } from "../Reducers/loginReducers/loginSlice";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

function Feedback() {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(null);          // ★ star rating stored here
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    dispatch(validatelogin());
  }, [dispatch]);

  const islogin = useSelector((state) => state.login);
  const loggedin = islogin === true ? true : false;

  // ⭐ Convert number → stars
  const convertToStars = (value) => {
    return "★★★★★".slice(0, value) + "☆☆☆☆☆".slice(value, 5);
  };

  // ⭐ Highlight only selected emoji
  const getBgColor = (value) => {
    const stars = convertToStars(value);
    return rating === stars ? "#32CD32" : "#D9D9D9"; // selected → green
  };

  // ⭐ Submit feedback to Django
  const submitFeedback = async () => {
    if (!rating) {
       toast.warn("Please select a rating.",{theme:"colored"})
      
      return;
    }
    if (!feedbackText.trim()) {
       toast.warn("Please write some feedback.",{theme:"colored"})
     
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/feedback/", {
        method: "POST",
        headers: {
            'Content-Type':  "application/json",
            Authorization: localStorage.getItem('authToken'),
            usertype: localStorage.getItem('usertype'),
            userid: localStorage.getItem('userid'),
          },
        body: JSON.stringify({
          rating: rating,           
          feedback: feedbackText,
          userid: localStorage.getItem('userid'),
          usertype:localStorage.getItem("usertype")
        }),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setRating(null);
        setFeedbackText("");
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      alert("Error connecting to server.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container text-center mt-5 position-relative">
        <h2 className="mb-3">Give us a feedback!</h2>
        <p className="mb-4">
          Your input will help us improve our service towards you. So we kindly
          request you to contribute to the feedback form.
        </p>

        {/* ⭐ Emoji Rating Section */}
        <div className="d-flex justify-content-center mb-4">
          {[
            { file: "emoji5.png", value: 5 },
            { file: "emoji4.png", value: 4 },
            { file: "emoji3.png", value: 3 },
            { file: "emoji2.png", value: 2 },
            { file: "emoji1.png", value: 1 },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() =>
                loggedin && setRating(convertToStars(item.value))
              }
              className="d-flex justify-content-center align-items-center me-3"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: getBgColor(item.value),
                borderRadius: "50%",
                padding: "10px",
                cursor: loggedin ? "pointer" : "not-allowed",
                transition: "background-color 0.2s ease",
              }}
            >
              <img
                src={`/emoji/${item.file}`}
                alt={`Rating ${item.value}`}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          ))}
        </div>

        {/* ⭐ Show selected star rating */}
        {rating && (
          <p style={{ fontSize: "22px", marginTop: "-15px" }}>
            Selected Rating: <strong>{rating}</strong>
          </p>
        )}

        {/* Feedback Form Section */}
        <div
          className="p-4"
          style={{
            background: "#f8f9fa",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "0 auto",
            filter: loggedin ? "none" : "blur(4px)",
            transition: "filter 0.3s ease",
          }}
        >
          <textarea
            className="form-control mb-3"
            placeholder="Add your feedback"
            rows="6"
            style={{ minHeight: "400px" }}
            disabled={!loggedin}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          ></textarea>

          <button
            className="btn btn-success w-100"
            style={{ color: "#fff" }}
            disabled={!loggedin}
            onClick={submitFeedback}
          >
            Submit Feedback
          </button>
        </div>

        {/* Login Button Section */}
        {!loggedin && (
          <div className="login-section">
            <button className="login-button">
              <Link to="/login">Login Now</Link>
            </button>
            <p className="login-text">To submit feedback, you must login first.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
