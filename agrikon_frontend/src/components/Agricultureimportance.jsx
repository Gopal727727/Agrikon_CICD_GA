import React from "react";
import '../css/agricultureimportance.css';

const Agricultureimportance = () => {
  return (
    <div className="agriimportance">
      <div className="container py-5">
        <div className="row align-items-center mt-5">
          {/* Image Section */}
          <div className="col-md-6 position-relative mb-4 mb-md-0">
            <div className="position-relative">
              <img
                src="farmersinfield.png" // Replace this with the URL of the large image
                alt="Agriculture field"
                className="large-image img-fluid rounded-circle shadow-lg"
              />
              <img
                src="womeninfield.png" // Replace this with the URL of the smaller image
                alt="Worker in field"
                className="small-image position-absolute rounded-circle border border-white"
              />
              {/* Orange Dot */}
              <div className="orange-dot position-absolute rounded-circle bouncy-dot"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            {/* Small Logo */}
            <img
              src="/logo1.png" // Replace with the logo's URL
              alt="Logo"
              className="small-logo mb-2"
            />
            <h6 className="text-muted mb-2">Introduction to ag</h6>
            <h1 className="fw-bold">
              Why Agriculture is <br /><span className="text-success">Important?</span>
            </h1>
            <p className="text-secondary my-3">
              Agriculture is crucial for global food security, economic stability,
              and employment. It drives innovation, supports rural communities,
              and contributes to environmental sustainability, making it a
              cornerstone for growth and development worldwide.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">
                🌱 <strong>Food Security</strong>
              </li>
              <li className="mb-2">
                📈 <strong>Economic Growth</strong>
              </li>
              <li>
                🌍 <strong>Sustainability</strong>
              </li>
            </ul>
            <div className="d-flex align-items-center my-4">
              <div className="circle-percentage">
                <span className="percentage-value fw-bold fs-4 text-success">70%</span>
              </div>
              <p className="ms-3 mb-0 text-muted">
                Involved in agriculture in <span className="gradient-text">Nepal</span>
              </p>
            </div>
            <button className="btn btn-lg text-white learn-more-button">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agricultureimportance;
