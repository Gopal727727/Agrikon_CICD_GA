import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { faInstagram, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass, faGlobe, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbartop = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#57ad6c" }}>
      <div className="container-fluid me-5 ms-5">
        {/* Toggler Button for Collapsible Navbar */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Social Media Icons */}
        <div className="d-flex align-items-center">
          <a className="navbar-brand me-2 text-white" href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a className="navbar-brand me-2 text-white" href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a className="navbar-brand me-2 text-white" href="#">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>

        {/* Collapsible Navbar Content */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarResponsive">
          <p style={{color:'white',fontWeight:'bolder',fontSize:"20px"}}>Agricon is solution to your farming problems</p>
          
        </div>

        {/* Right Side: Language Dropdown and Live Chat */}
        <div className="d-flex align-items-center">
          

          {/* Live Chat Button */}
          <Link to="/AgriAssistance">
          <button
            type="button"
            className="btn btn-success"
            style={{ position: "relative",textDecoration:'none' }}
          >
           <FontAwesomeIcon icon={faComment} />  Live Chat
  
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbartop;
