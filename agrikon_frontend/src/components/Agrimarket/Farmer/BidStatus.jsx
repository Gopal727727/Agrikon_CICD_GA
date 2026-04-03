import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/popup.css";
import axios from "axios";

const BidStatus = (props) => {
  const [bidstatus, setBidStatus] = useState("open"); // Default value
  const [bidclosestime, setBidCloseTime] = useState(null);

  const handleSave = async (id, initialStatus) => {
    if (bidstatus !== initialStatus) {
      try {
        console.log(id, bidstatus);
        const response = await axios.patch(
          `http://127.0.0.1:8000/addcrop/${id}/`,
          { bidstatus, bidclosestime },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("authToken"),
              usertype: localStorage.getItem("usertype"),
              userid: localStorage.getItem("userid"),
            },
          }
        );

        console.log("Bid status updated:", response.data);
        props.setclose(false);
        window.location.reload();
      } catch (error) {
        console.error("Error updating bid status:", error);
      }
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="container mt-4 p-3 border rounded popup-inner">
        <div className="d-flex justify-content-between align-items-start border-bottom pb-3">
          <button className="btn btn-danger px-4" onClick={() => props.setclose(false)}>
            Close
          </button>
        </div>

        <h4>Crop Details</h4>
        <div className="mt-0">
          <div className="table-responsive">
            <table
              className="crop-table"
              style={{
                borderCollapse: "collapse",
                border: "none",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <thead className="crop-thead">
                <tr style={{ borderBottom: "2px solid #ccc" }}>
                  <th style={{ border: "2px solid #ccc" }}>Crop Name</th>
                  <th style={{ border: "2px solid #ccc" }}>Total Weight</th>
                  <th style={{ border: "2px solid #ccc" }}>Estimated Price</th>
                  <th style={{ border: "2px solid #ccc" }}>Current Bid</th>
                  <th style={{ border: "2px solid #ccc" }}>Grade</th>
                  <th style={{ border: "2px solid #ccc" }}>Bidding Status</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr style={{ borderBottom: "2px solid #ccc" }}>
                  <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                    {props.crop.cropName}
                  </td>
                  <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                    {props.crop.croptotalweight}
                  </td>
                  <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                    {props.crop.cropestimatedprice}
                  </td>
                  <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                    Unknown
                  </td>
                  <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                    {props.crop.cropgrade}
                  </td>
                  <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                    <select
                      className="form-select"
                      value={bidstatus}
                      onChange={(e) => setBidStatus(e.target.value)}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Date input when bid status is 'closed' */}
        {props.crop.bidstatus === "closed" && (
        <div className="mt-3 p-3 border rounded bg-light">
          <p className="mb-2 fw-bold text-success">Please select the closing date:</p>
          <input
            type="date"
            className="form-control"
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            onChange={(e) => setBidCloseTime(e.target.value)}
            required
          />
        </div>
      )}


        {/* Save button with disabled condition */}
        <div className="text-end mt-3">
          <button
            className="btn btn-success px-4"
            onClick={() => handleSave(props.crop.id, props.crop.bidstatus)}
            disabled={props.crop.bidstatus === "closed" && !bidclosestime} // Disable when closed but date not selected
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BidStatus;
