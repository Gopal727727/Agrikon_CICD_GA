import React, { useState,useEffect } from 'react';
import '../../../css/addcropbid.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

function AddCropBid() {
const userid=parseInt(localStorage.getItem("userid"))

  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]); // Store actual image files
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [formdata, setformData] = useState({
    cropName: "",
    cropestimatedprice: "",
    cropgrade: "",
    croptotalweight: "",
    cropdescription: "",
    cropimages: []
  });
  
  // Storing form data
  const handelfromdata = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + uploadedImages.length > 6) {
      alert("You can upload up to 6 images only.");
      return;
    }

    const newImageFiles = files.slice(0, 6 - uploadedImages.length);
    const newImageURLs = newImageFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newImageFiles]); // Store actual files
    setUploadedImages((prev) => [...prev, ...newImageURLs]); // Store preview URLs
  };

  // Remove image
  const removeImage = (url) => {
    const index = uploadedImages.indexOf(url);
    if (index !== -1) {
      setUploadedImages((prev) => prev.filter((img, i) => i !== index));
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show modal on form submission
  };

  const handleModalAction = async (action) => {
    if (action === 'yes') {
      try {
        const formData = new FormData();

        // Append text data
        Object.keys(formdata).forEach((key) => {
          formData.append(key, formdata[key]);
        });

        // Append actual image files
        imageFiles.forEach((file) => {
          formData.append('cropimages', file);
        });
        formData.append("addedbyuser",userid)

        const response = await axios.post("http://127.0.0.1:8000/addcrop/", formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem("authToken"),
            usertype: localStorage.getItem("usertype"),
            userid:userid
           },
        });

       
        if (response.data.success) {
          toast.success('Crop added to the market!',{theme:"colored"});
        } else {
          toast.error(response.data.error,{theme:"colored"});
        }
      } catch (error) {
        console.log(error);
      }
    }
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ backgroundColor: "#f0f8ff", padding: "20px" }}>
        <h2 className="text-center">Add Your Crop for Bidding</h2>
        <form
          className="bg-white rounded p-4"
          style={{ borderRadius: "20px", margin: "5%" }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="row">
            {/* Left Side Input Fields */}
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Crop Name</label>
                <div className="input-group custom-width">
                  <span className="input-group-text">
                    <img src="/inputicon/1.png" alt="icon" style={{ width: "20px" }} />
                  </span>
                  <input type="text" className="form-control" placeholder="Enter Crop Name" name='cropName' value={formdata.cropName} onChange={handelfromdata} />
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Estimate Price (₹/kg)</label>
                <div className="input-group custom-width">
                  <span className="input-group-text">
                    <img src="/inputicon/2.png" alt="icon" style={{ width: "20px" }} />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Estimate Price"
                    name='cropestimatedprice'
                    value={formdata.cropestimatedprice}
                    onChange={handelfromdata}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Grade (A, B, C, ...)</label>
                <div className="input-group custom-width">
                  <span className="input-group-text">
                    <img src="/inputicon/3.png" alt="icon" style={{ width: "20px" }} />
                  </span>
                  <input type="text" className="form-control" placeholder="Enter Grade"
                    value={formdata.cropgrade}
                    name='cropgrade'
                    onChange={handelfromdata}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Total Weight (Kg)</label>
                <div className="input-group custom-width">
                  <span className="input-group-text">
                    <img src="/inputicon/4.png" alt="icon" style={{ width: "20px" }} />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Total Weight"
                    name='croptotalweight'
                    value={formdata.croptotalweight}
                    onChange={handelfromdata}
                  />
                </div>
              </div>
            </div>

            {/* Right Side Upload Section */}
            <div className="col-md-6">
              <div
                className="p-3 border"
                style={{
                  borderColor: "#7d7d7d",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <h3>Upload Crop Image</h3>
                <label
                  htmlFor="fileUpload"
                  className="d-block mb-2"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/img/plus-square.png"
                    alt="Upload"
                    style={{ width: "200px", height: "200px" }}
                  />
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  className="d-none"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={handleImageUpload}
                />
                <small className="text-muted d-block">
                  Only supports jpg, jpeg, png
                </small>
                <div className="mt-3">
                  <div className="d-flex flex-wrap gap-2">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="position-relative">
                        <img
                          src={img}
                          alt={`Uploaded ${idx + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            marginTop: '3vh',
                            marginRight: "3vh",
                            marginLeft: "3vh"
                          }}
                        />
                        <button
                          type="button"
                          className="btn-close position-absolute"
                          style={{ top: "0", right: "0" }}
                          onClick={() => removeImage(img)}
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Field */}
          <div className="form-group mt-4">
            <label>Description</label>
            <div className="input-group">
              <span className="input-group-text" style={{ backgroundColor: 'white' }}>
                <img src="/inputicon/5.png" alt="icon" style={{ width: "20px", marginTop: '-25vh' }} />
              </span>
              <textarea
                className="form-control"
                rows="8"
                placeholder="Describe your crop"
                name='cropdescription'
                value={formdata.cropdescription}
                onChange={handelfromdata}
              ></textarea>
            </div>
            <small className="smalltext">
              Contact Information of the farmers will automatically be filled using their registration details
            </small>
          </div>

          {/* Submit Button */}
          <div className="text-end mt-3">
            <button
              type="submit"
              className="btn btn-lg"
              style={{
                backgroundColor: "#FF8418",
                color: "white",
                borderRadius: "20px",
                width: "300px",
              }}
            >
              Add Crop to Krishi Market
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">Are you sure you want to add the crop to Krishi Market?</div>
            <div className="modal-buttons">
              <button to='success' className='yes-btn text-white' style={{ textDecoration: 'none', color: 'black' }}
                onClick={() => handleModalAction('yes')}
              >
                Yes</button>

              <button
                className="no-btn"
                onClick={() => handleModalAction('no')}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCropBid;