import React from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faHeart, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { validatelogin } from '../Reducers/loginReducers/loginSlice';
 import { toast } from 'react-toastify';
const Navbar = ({ className = '' }) => {
  const dispatch=useDispatch()
useEffect(() => {
      dispatch(validatelogin());
    }, [dispatch]);
  const islogin=useSelector(state=>state.login)
  const loggedin = islogin===true?true:false;
 const deletesession=()=>
 {
  localStorage.removeItem('userid');
  dispatch(validatelogin());
  toast.warn("logged out ",{theme:"colored"})
 }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light bg-transparent me-4 ${className}`}>
        <div className="container-fluid">
          {/* Logo */}
          <a className=" navbar-brand ms-4" href="#">
            <img src="/logo1.png" alt="Logo" style={{ height: '50px', filter: 'brightness(250%)' }} />
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className=" nav-link animated-link underline-hover" to='/'>
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle animated-link underline-hover "
                  href="#"
                  id="agriAssistDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  AgriAssist
                </a>
                <ul className="dropdown-menu bg-white" aria-labelledby="agriAssistDropdown">
                  <li><Link className="dropdown-item" to="/weather">Weather Forecasting</Link></li>
                  <hr className="dropdown-divider" style={{ borderColor: '#A5A5A5' }} />
                  <li><Link className="dropdown-item" to='/AgriAssistance'>Agri Assistance </Link></li>
                  <hr className="dropdown-divider" style={{ borderColor: '#A5A5A5' }} />
                  <li><Link className="dropdown-item" to="/CropReccomender">Crop Recommender</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown bg-transparent">
                <a
                  className="nav-link dropdown-toggle animated-link underline-hover "
                  href="#"
                  id="agroShopDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  AgroShop
                </a>
                <ul className="dropdown-menu bg-white" aria-labelledby="agroShopDropdown">
                  <li><Link className=" dropdown-item" to="marketinformation">Market Information</Link></li>
                  <hr className="dropdown-divider" style={{ borderColor: '#A5A5A5' }} />
                  {
                    localStorage.getItem("usertype")=="Farmer"?
                    <li><Link className=" dropdown-item" to="/KrishiMarket">Krishi Market</Link></li>:
                     <li><Link className=" dropdown-item" to="/KrishiMarket_business">Krishi Market</Link></li>
                    }
                 
                </ul>
              </li>

              <li className="nav-item">
                <a className=" nav-link animated-link underline-hover" href="#">
                  About-Us
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center">

              {/* User Dropdown */}
              {loggedin ? (
                <div className="dropdown">
                  <a
                    className="white-icon nav-link dropdown-toggle "
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.5rem' }} />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ backgroundColor: '#ffffff', border: '1px solid #A5A5A5' }}>
                    <li>
                      <Link className="dropdown-item" to='/farmer/Dashboard'>
                        <FontAwesomeIcon icon={faTachometerAlt} className="me-2" /> Dashboard
                      </Link>
                    </li>
                    <hr className="dropdown-divider" style={{ borderColor: '#A5A5A5' }} />
                    <li>
                      <a className="dropdown-item" href="#">
                        <FontAwesomeIcon icon={faHeart} className="me-2" /> Favourites
                      </a>
                    </li>
                    <hr className="dropdown-divider" style={{ borderColor: '#A5A5A5' }} />
                    <li>
                      <button className="dropdown-item" href="#" onClick={deletesession}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
                        
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
              <li>
  <Link to="/login">
    <button
      className="btn rounded-pill px-4"
      id="login_btn"
      style={{ backgroundColor: '#b641d6' }}
    >
      Login
    </button>
  </Link>
</li>
                
              )}
            </div>
          </div>
        </div>
      </nav>
      <hr className='text-white' />
    </>
  );
};

export default Navbar;