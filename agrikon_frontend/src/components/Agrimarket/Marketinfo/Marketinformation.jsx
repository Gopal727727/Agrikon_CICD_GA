import React from "react";
import "../../../css/marketinformation.css";
import Banner from "../../Agriassist/Banner";

function Marketinformation() {
  return (
    <>
      <Banner heading='Agri Market' description='Bid Smart, Grow Big – The Future of Crop Trading Starts Here' />
      <div className="marketinfo-container">
        {/* Header Section */}
        <div className="marketinfo-header d-flex justify-content-between align-items-center mb-4">
          <h4 className="marketinfo-title">Market Information</h4>
          <button className="marketinfo-btn btn btn-warning px-3 py-2 rounded">
            Add Own Crop
          </button>
        </div>

        {/* Show and Sort By Fields */}
        <div className="marketinfo-controls">
          {/* Show Field */}
          <div className="d-flex align-items-center">
            <label htmlFor="show" className="me-2">
              Show:
            </label>
            <select id="show" className="form-select marketinfo-select">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Sort By Field */}
          <div className="d-flex align-items-center">
            <label htmlFor="sort" className="me-2">
              Sort By:
            </label>
            <select id="sort" className="form-select marketinfo-select">
              <option value="best">Best Crop</option>
              <option value="price">Price</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Main Card */}
        <div className="marketinfo-card">
          <div className="marketinfo-placeholder"></div>
          <h5 className="marketinfo-chart-title text-center mb-4">
            Price of Potato in Recent Months
          </h5>
          <div className="marketinfo-chart-container">
            <div className="marketinfo-chart d-flex justify-content-around align-items-end">
              <div className="marketinfo-bar marketinfo-bar-jan"></div>
              <div className="marketinfo-bar marketinfo-bar-feb"></div>
              <div className="marketinfo-bar marketinfo-bar-mar"></div>
              <div className="marketinfo-bar marketinfo-bar-apr"></div>
              <div className="marketinfo-bar marketinfo-bar-may"></div>
              <div className="marketinfo-bar marketinfo-bar-jun"></div>
            </div>
            <div className="marketinfo-months d-flex justify-content-around mt-3">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Marketinformation;
