import React,{useState,useEffect} from 'react';
import "../../../../css/farmerdashboardnav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboardnav(props) {

  
  const [userdata,setuserdata]=useState([])
  useEffect(() => {
    const fetchdetails = async () => {


      try {
        const response = await axios.get('http://localhost:8000/userdetails/', {

          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('authToken'),
            usertype: localStorage.getItem('usertype'),
            userid: localStorage.getItem('userid'),
          },
        });
        if (response) {
         console.log(response.data)
          setuserdata(response.data)
        }
        else{
          console.log(response.error)
        }




      } catch (error) {
        console.error('Error fetching bidded crop IDs:', error);
      }
    };

    fetchdetails();
  }, []);



   const deletesession=()=>
   {
    localStorage.removeItem('userid');
    dispatch(validatelogin());
    toast.warn("logged out ",{theme:"colored"})
   }
  
  return (
    <div className="farmerdashnav d-flex align-items-center justify-content-between px-3 py-2 bg-light border-bottom">
      
      {/* Logo Section */}
      <div className="farmerdashnav-logo d-flex align-items-center">
        <Link to="/"> <img
          src="/logo.png"
          alt="Artova Workspace Logo"
          className="farmerdashnav-logo-img me-2"
        /></Link>
      </div>

      {/* Combined Section: Dashboard Heading and Search Bar */}
      <div className="farmerdashnav-main d-flex flex-grow-1 justify-content-between align-items-center mx-6 ms-4">
        {/* Dashboard Heading */}
        <h4 className="farmerdashnav-heading text-center mb-0 ms-5">Dashboard</h4>

        
      </div>

      {/* Right Section */}
      <div className="farmerdashnav-right d-flex align-items-center">
        {/* Language Dropdown */}
        <div className="farmerdashnav-lang-dropdown dropdown me-3">
          <button
            className="farmerdashnav-lang-btn btn btn-light dropdown-toggle"
            type="button"
           
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* Flag Image Inside Dropdown */}
            <img
              src="/flag/usa.png"
              alt="English Flag"
              className="farmerdashnav-flag-img rounded-circle"
            />
            Eng (US)
          </button>
        </div>

        {/* Notification Icon */}
        <button className="farmerdashnav-notification-btn btn btn-light me-3">
          <FontAwesomeIcon icon={faBell} className="farmerdashnav-notification-icon" />
        </button>

        {/* User Profile */}
        {userdata.length > 0 && (
  <div className="farmerdashnav-user d-flex align-items-center">
    <img
      src={`http://localhost:8000${userdata[0].profile_picture}`}
      alt="User Profile"
      className="farmerdashnav-user-img rounded-circle"
    />
    <div className="farmerdashnav-user-info ms-2 me-5">
      <h6 className="m-0">{userdata[0].name}</h6>
      <small className="text-muted">{userdata[0].usertype}</small>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Dashboardnav;
