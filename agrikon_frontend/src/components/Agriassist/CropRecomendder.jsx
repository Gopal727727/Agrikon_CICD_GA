import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ModalForCropRecc from "./ModalForCropRecc";
import Banner from "./Banner";

function CropRecommender() {
  const [formData, setFormData] = useState({
    soilType: "",
    customSoilType: "",
    soilMoisture: 50,
    soilPh: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [cropDetails, setCropDetails] = useState(null); // State for storing cropDetails

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (value) => {
    setFormData({ ...formData, soilMoisture: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = {
      soilPh: formData.soilPh,
      soilMoisture: `${formData.soilMoisture}%`,
      soilType:
        formData.soilType === "others" ? formData.customSoilType : formData.soilType,
    };

    setCropDetails(details); // Set cropDetails state
    setShowModal(true);
    console.log(details); // Logs the JSON for debugging
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Banner heading="Agri Assist" description="" />
      <div
        className="mt-1 mb-1 container-fluid bg-success d-flex align-items-center justify-content-center min-vh-100 text-white"
        style={{ backgroundColor: "#237A48" }}
      >
        <div className="row w-100">
          {/* Left Side with Images */}
          <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
            <img
              src="/img/sunflower.png"
              alt="Image 1"
              className="img-fluid"
              style={{ width: "70%", position: "relative" }}
            />
            <img
              src="/img/tomato.png"
              alt="Image 2"
              className="img-fluid position-absolute"
              style={{
                width: "45%",
                bottom: "-2%",
                left: "10%",
                zIndex: 1,
              }}
            />
          </div>

          {/* Right Side with Form */}
          <div className="col-md-6">
            <h1 className="mb-3">Crop Recommender Tool</h1>
            <p style={{ fontSize: "12px" }}>Please fill this form below:</p>
            <form
              className="p-4 rounded bg-transparent"
              style={{ border: "1px solid white" }}
              onSubmit={handleSubmit}
            >
              {/* Soil PH */}
              <div className="mb-5">
                <label
                  htmlFor="soilPh"
                  className="form-label text-white text-bold"
                >
                  Soil PH
                </label>
                <select
                  id="soilPh"
                  name="soilPh"
                  className="form-select"
                  style={{
                    textAlign: "center",
                    borderRadius: "10px",
                    fontSize: "18px",
                    width: "40vh",
                    padding: "10px",
                  }}
                  value={formData.soilPh}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Soil pH
                  </option>
                  {Array.from({ length: 10 }, (_, i) => 4.5 + i * 0.5).map(
                    (value) => (
                      <option key={value} value={value}>
                        {value.toFixed(1)}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Soil Moisture */}
              <div className="mb-5">
                <label
                  htmlFor="soilMoisture"
                  className="form-label text-white text-bold"
                >
                  Soil Moisture
                </label>
                <div
                  className="slider-container"
                  style={{ position: "relative" }}
                >
                  <Slider
                    id="soilMoisture"
                    min={0}
                    max={100}
                    value={formData.soilMoisture}
                    onChange={handleSliderChange}
                    trackStyle={{ backgroundColor: "#C77EFF", height: 8 }}
                    handleStyle={{
                      borderColor: "#C77EFF",
                      height: 20,
                      width: 20,
                      backgroundColor: "#C77EFF",
                    }}
                    railStyle={{ backgroundColor: "#d3d3d3", height: 8 }}
                  />
                  <div
                    className="percentage-display"
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "-25px",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {formData.soilMoisture}%
                  </div>
                </div>
              </div>

              {/* Soil Type */}
              <div className="mb-3">
                <label
                  htmlFor="soilType"
                  className="form-label text-white text-bold"
                >
                  Soil Type
                </label>
                {formData.soilType !== "others" ? (
                  <select
                    id="soilType"
                    name="soilType"
                    className="form-select"
                    style={{
                      textAlign: "center",
                      borderRadius: "10px",
                      fontSize: "18px",
                      width: "40vh",
                      padding: "10px",
                    }}
                    value={formData.soilType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Your Soil Type
                    </option>
                    <option value="clay soil">Clay Soil</option>
                    <option value="sandy soil">Sandy Soil</option>
                    <option value="loam soil">Loam Soil</option>
                    <option value="others">Others</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="customSoilType"
                    className="form-control"
                    style={{ borderRadius: "10px", fontSize: "14px" }}
                    placeholder="Enter custom soil type"
                    value={formData.customSoilType}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-5"
                  style={{
                    backgroundColor: "#B24DFF",
                    borderRadius: "30px",
                    padding: "15px",
                    width: "60vh",
                  }}
                >
                  Get Recommendations
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal */}
        {showModal && cropDetails && (
          <div
            className="modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
            }}
          >
            <div
              className="modal-content"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "90%",
                height: "90%",
                overflow: "auto",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "20px",
                  color: "#B24DFF",
                }}
              >
                &times;
              </button>
              <ModalForCropRecc cropDetails={cropDetails} onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommender;
