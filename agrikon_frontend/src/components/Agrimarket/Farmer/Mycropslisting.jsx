import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Croptable from './Croptable';
import AddCropBid from './AddCropBid';
import Banner from '../../Agriassist/Banner';

function Mycropslisting() {
  const [showAddCropBid, setShowAddCropBid] = useState(false); 

  return (
    <div>
      <Banner heading='Agri Market' description='Bid Smart, Grow Big – The Future of Crop Trading Starts Here' />
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px' }}>
        {/* Top section */}
        <h2 className="h2center mb-4">
          <b>Add Your Crop For Bidding</b>
        </h2>
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Search Bar */}
          <div className="position-relative" style={{ width: '300px', height: '60px' }}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9c9c9c',
                fontSize: '20px', // Adjust icon size if necessary
              }}
            />
            <input
              type="text"
              placeholder="Search your crop"
              className="form-control"
              style={{
                height: '100%', // Matches parent height
                paddingLeft: '50px', // Accommodate icon
                border: '1px solid #D9D9D9',
                fontSize: '16px', // Adjust font size for better proportion
                borderRadius: '8px', // Optional, for smoother corners
              }}
            />
          </div>

          {/* Add Crop Button */}
          <button
            className="btn text-white"
            style={{
              backgroundColor: '#FF8418',
              width: '250px',
              height: '60px',
              fontSize: '16px',
              borderRadius: '8px',
            }}
            onClick={() => setShowAddCropBid(true)} // Show AddCropBid component
          >
            Add Your Crop
          </button>
        </div>
        <hr className="mt-5" />

        {/* Conditional rendering of components */}
        {showAddCropBid ? (
          <div style={{ position: 'relative' }}>
            {/* AddCropBid Component */}
            <AddCropBid />
            {/* Close Button */}
            <button
              onClick={() => setShowAddCropBid(false)} // Close AddCropBid
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: '#FF8418',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ✖
            </button>
          </div>
        ) : (
          // Croptable Component
          <Croptable />
        )}
      </div>
    </div>
  );
}

export default Mycropslisting;
