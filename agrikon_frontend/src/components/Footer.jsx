import React from 'react';
import '../css/Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faAt, faLocationDot, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook, faYoutube, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="logo-container">
                            <img
                                src="/logo1.png"
                                className="footer-logo"
                                style={{ height: '50px', filter: 'brightness(250%)' }}
                            />
                            <h2 className="logo-text">Agricon</h2>
                        </div>
                        <p className="brand-tagline">Cultivating Digital Agriculture</p>
                        <p className="brand-description">
                            Agricon  is your trusted partner in modern agriculture, 
                            providing innovative tools and expert knowledge to help your fields thrive.
                        </p>
                        
                        <div className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="newsletter-input" 
                            />
                            
                        </div>
                        
                        <div className="social-links">
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="footer-nav">
                        <h3 className="nav-title">Quick Links</h3>
                        <ul className="nav-links">
                            <li><a href="#"><FontAwesomeIcon icon={faSeedling} /> Home</a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faSeedling} /> About</a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faSeedling} /> Offers</a></li>
                        </ul>
                    </nav>

                    {/* Services Links */}
                    <div className="services-section">
                        <h3 className="services-title">Our Services</h3>
                        <ul className="services-list">
                            <li><a href="#"><FontAwesomeIcon icon={faSeedling} /> Smart Irrigation</a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faSeedling} /> Crop Monitoring</a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faSeedling} /> Soil Analysis</a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faSeedling} /> Agri Training</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="contact-info">
                        <h3 className="contact-title">Reach Us</h3>
                        <div className="contact-details">
                            <p><FontAwesomeIcon icon={faPhone} /> +977 01-5678888</p>
                            <p><FontAwesomeIcon icon={faPhone} /> +977 9876543210</p>
                            <p><FontAwesomeIcon icon={faAt} /> agricon987@gmail.com</p>
                            <p><FontAwesomeIcon icon={faLocationDot} /> Khairahani-12<br/>Chitwan, Parsa</p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>© 2025 8th semester project by ishant and shirshak.</p>
                    <div className="legal-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">FAQ</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;