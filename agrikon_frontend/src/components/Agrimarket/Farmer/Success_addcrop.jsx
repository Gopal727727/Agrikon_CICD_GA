import React from 'react';
import { Link } from 'react-router-dom';
function Success_addcrop() {
  return (
    <div style={{ backgroundColor: '#b641d6' }}>
      <h1 className='text-white text-center' style={{ padding: '20px' }}>
        Crop Added Successfully !!!
      </h1>
      <div
        className='bg-light mb-5'
        style={{ borderTopLeftRadius: '50px', borderTopRightRadius: '50px', padding: '20px' }}
      >
        <p className='text-center text-justify'>
          Crop Details Is Sent To Admin For Confirmation. Once The Crop Is Added Then It Will Be
          Listed on Krishi Market.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '60px',
          }}
        >
          <button
            style={{
              background: '#FF8418',
              borderRadius: '10px',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '20%',
              height: '50px',
            }}
          >
            <Link style={{textDecoration:'none',color:'black'}} to='/marketinformation'>Return To Market Information</Link>
          </button>
          <span>OR</span>
          <button
            style={{
              background: '#FF8418',
              borderRadius: '10px',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              marginRight: '20%',
              height: '50px'
            }}
          >
            <Link to='/KrishiMarket' style={{textDecoration:'none',color:'black'}}>Add Another Crop</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success_addcrop;
