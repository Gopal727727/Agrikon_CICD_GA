import React from "react";

const CropIssueFinder = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
       position:"relative",
       marginTop:"-50px"

      }}
    >
      <div
        className="card shadow-sm text-center"
        style={{
          borderRadius: "10px",
          border: "1px solid #e0e0e0",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h5
          className="py-3"
          style={{
            fontWeight: "bold",
          }}
        >
          What Happened To My Crop?
        </h5>
        <div className="d-flex align-items-center px-4 pb-4  ">
          <input
            type="file"
            className="form-control me-3"
            placeholder="Upload Photo Here"
            style={{
              backgroundColor: "#f3f3f3",
              border: "1px solid #ccc",
              borderRadius: "5px",
              height: "40px", // Set height of the input field
            }}
          />
          <button
            className="btn"
            style={{
              backgroundColor: "#8a2be2",
              color: "white",
              borderRadius: "5px",
              padding: "0px 20px", // Remove vertical padding to match input height
              fontWeight: "bold",
              height: "40px", // Set height of the button to match the input
              width:"200px"
            }}
          >Find Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropIssueFinder;
