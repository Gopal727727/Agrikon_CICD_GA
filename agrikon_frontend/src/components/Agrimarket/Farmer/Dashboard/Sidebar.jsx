import React from 'react';
import { Link, redirect, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faShoppingCart, faGavel, faBrain, faBook, faComments, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function Sidebar() {

 const deletesession=()=>
 {
  localStorage.removeItem('userid');
  window.location.href = "/";
  toast.warn("logged out ",{theme:"colored"})
 }
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Common styles for the active links
  const activeLinkStyle = {
    backgroundColor: '#B641D6',
    color: '#fff',
    borderRadius: '5px',
    padding: '0.5rem',
  };

  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: '350px', height: '84vh', overflowY: 'auto',float:'left' }}>

      <div className="d-flex align-items-center mb-4 ms-4 me-4" style={isActive('/farmer/Dashboard') ? activeLinkStyle : {}}>
        <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
        <span>
          <Link to='/farmer/Dashboard' className={`text-decoration-none ${isActive('/farmer/Dashboard') ? 'text-white' : 'text-dark'}`}>Dashboard</Link>
        </span>
      </div>


      <div className="d-flex align-items-center mb-4 ms-4 me-4" style={isActive('/farmer/current-bidding') ? activeLinkStyle : {}}>
        <FontAwesomeIcon icon={faGavel} className="me-2" />
        <span>
          <Link to='' className='text-decoration-none text-dark'>Current Bidding</Link>
        </span>
      </div>

      <div className="d-flex align-items-center mb-4 ms-4 me-4" style={isActive('/farmer/ask-ai') ? activeLinkStyle : {}}>
        <FontAwesomeIcon icon={faBrain} className="me-2" />
        <span>
          <Link to='/AgriAssistance' className='text-decoration-none text-dark'>Ask with AI</Link>
        </span>
      </div>

      <div className="d-flex align-items-center mb-4 ms-4 me-4" style={isActive('/farmer/feedback') ? activeLinkStyle : {}}>
        <FontAwesomeIcon icon={faComments} className="me-2" />
        <span>
          <Link to='' className='text-decoration-none text-dark'>Feedback and Complaints</Link>
        </span>
      </div>


      <div
        className="mt-4 p-3 ms-4 me-4"
        style={{
            backgroundColor: '#FF8418',
            backgroundImage: 'url(/circle.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply', 
            textAlign: 'center',
            borderRadius: '20px',
        }}
        >
        <img
            src="/img/tinylogo.png"
            alt="Tiny Logo"
            style={{ width: '60px', marginBottom: '0px' }}
        />
        <h5 style={{ color: 'white' }}>
           Having any  <span className="text-success" style={{fontWeight:'bold'}}>problems?</span>
        </h5>
        <p className="text-white" style={{ fontSize: '14px' }}>
            Get direct access to phone call with us.
        </p>
        <button
            style={{
            color: 'black',
            backgroundColor: 'white',
            border: '2px solid white',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            cursor: 'pointer',
            }}
        >
            Contat number: 9811811819
        </button>
        </div>

      <hr />
      <div className="d-flex align-items-center p-2 ms-4 me-4" style={{ backgroundColor: '#B641D6', color: '#fff', borderRadius: '5px' ,width:'150px' }}>
        <FontAwesomeIcon icon={faSignOutAlt} className="me-2 " />
        <span><button style={{ backgroundColor: '#941db5ff', color: '#fff', borderRadius: '5px'}} onClick={deletesession}>Log out</button></span>
      </div>
    </div>
  );
}
