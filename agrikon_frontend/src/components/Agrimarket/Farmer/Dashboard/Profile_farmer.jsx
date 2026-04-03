import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons';

function Profile_farmer() {
  // Mock Database Fetch
  const dbProfileData = {
    name: 'Sangit Pokhrel',
    email: 'artavasolutions@gmail.com',
    phone: '+977 9806242854',
    password: '********',
    address: 'Kathmandu-29, Ghattekulo',
    profileImage: '/PfP_farmer.png',
  };

  const [profileData, setProfileData] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setProfileData(dbProfileData);
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mt-3">
      <div className="row">
        {/* Profile Section */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card p-3 shadow">
            <div className="text-center">
              <img
                src={profileData.profileImage}
                alt="profile"
                className="rounded-circle mb-3"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  border: '2px solid orange',
                }}
              />
              <h5 className="text-start">My Profile</h5>
            </div>
            <form>
              {/* Name */}
              <div className="mb-3 position-relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3"
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  defaultValue={profileData.name}
                />
              </div>

              {/* Email */}
              <div className="mb-3 position-relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3"
                />
                <input
                  type="email"
                  className="form-control ps-5"
                  defaultValue={profileData.email}
                />
              </div>

              {/* Phone */}
              <div className="mb-3 position-relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3"
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  defaultValue={profileData.phone}
                />
              </div>

              {/* Password */}
              <div className="mb-3 position-relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3"
                />
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="form-control ps-5"
                  defaultValue={profileData.password}
                  style={{ paddingRight: '40px' }} // Add extra space for the button
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={togglePasswordVisibility}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '18px',
                  }}
                >
                  👁️
                </button>
              </div>


              {/* Address */}
              <div className="mb-3 position-relative">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="position-absolute top-50 start-0 translate-middle-y ms-3"
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  defaultValue={profileData.address}
                />
              </div>

              <button
                type="submit"
                className="btn float-end mt-5"
                style={{
                  backgroundColor: '#ffbd77',
                  borderRadius: '20px',
                  width: '100px',
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>

        {/* Notifications and Recent Uploads Section */}
        <div className="col-lg-8 col-md-6">
          <div className="row mb-4">
            {/* Notifications */}
            <div className="col-12">
              <div className="card p-3 shadow">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Notifications</h5>
                  <div>
                    <button className="btn btn-link text-black me-0">All</button>
                    <button className="btn btn-link text-black">Mark all as read</button>
                  </div>
                </div>
                <div
                  className="row row-cols-2 g-3"
                  style={{
                    height: '35vh',
                    overflowY: 'auto',
                    gap:'10px'
                  }}
                >
                  {Array(6)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={i}
                        className="col d-flex align-items-center border rounded p-2"
                        style={{
                          borderRadius: '10px',
                          backgroundColor: 'white',
                          border: '1px solid gray',
                          fontSize: '12px',
                          height: '40px',
                          width: '250px',
                        }}
                      >
                        <img
                          src="/farmer.png"
                          alt="Profile"
                          className="rounded-circle me-3"
                          style={{ width: '30px', height: '30px' }}
                        />
                        <div className="flex-grow-1">
                          <p className="mb-1 fw-bold">Mohan Giri</p>
                          <p className="mb-0 text-muted">sent you a message</p>
                        </div>
                        <span className="text-muted small">4m</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="row">
          <div className="col-md-12">
                <div className="card p-3 shadow">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5><u>Recent Uploads By You</u></h5>
                    <button
                        className="btn"
                        style={{
                        backgroundColor: '#ffbd77',
                        borderRadius: '10px',
                        width: '100px',
                        }}
                    >
                        See All
                    </button>
                    </div>
                    <div
                    style={{
                        height: '30vh',
                        overflow: 'hidden',
                    }}
                    >
                    <div
                        className="d-flex flex-wrap"
                        style={{
                        height: '100%',
                        overflowY: 'auto',
                        }}
                    >
                        <div
                        className="d-grid"
                        style={{
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '20px',
                        }}
                        >
                        {Array(15) 
                            .fill()
                            .map((_, i) => (
                            <div
                                key={i}
                                className="bg-primary text-white d-flex align-items-center justify-content-center"
                                style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '5px',
                                }}
                            >
                                U
                            </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>
                </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Profile_farmer;
