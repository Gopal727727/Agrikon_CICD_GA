import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/popup.css";
import axios from "axios";
import { toast } from 'react-toastify';
const CurrentBids = (props) => {
  const [bidetails, setbidetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedstatus , setselectedstatus] = useState("");

  // Fetch bids for selected crop and farmer
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get("http://localhost:8000/businessbid/", {
          params: {
            crop_id: props.crop.id,
            farmer_id: localStorage.getItem("userid"),
          },
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("authToken"),
            usertype: localStorage.getItem("usertype"),
            userid: localStorage.getItem("userid"),
          },
        });

        const data = response.data.details || [];
        setbidetails(data);
      } catch (error) {
        console.error("Error fetching bid details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (props.trigger && props.crop?.id) {
      fetchBids();
    }
  }, [props.trigger, props.crop]);

  // Handle select field value change
  const handleStatusChange = (value) => {
    setselectedstatus(value)
  };

  // Send PATCH request with updated status
  const handleSaveStatus = async () => {
      if (!selectedstatus) {
            toast.warn("Please select an option before saving.",{theme:"colored"});
            return;
        }
        
    try {
      await axios.patch(
        "http://localhost:8000/businessbid/",
        {
          crop_id: props.crop.id,
          farmer_id: localStorage.getItem("userid"),
          update_status: selectedstatus, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
            usertype: localStorage.getItem("usertype"),
            userid: localStorage.getItem("userid"),
          },
        }
      );
      toast.success("Status updated successfully.",{theme:"colored"});
      props.setclose(false);

    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.",{theme:"colored"});
    }
  };

  if (!props.trigger || loading) return null;

  return (
    <div className="popup">
      <div className="container mt-4 p-3 border rounded popup-inner">
        {/* Close Button */}
        <div className="d-flex justify-content-between align-items-start border-bottom pb-3">
          <button
            className="btn btn-danger px-4"
            onClick={() => {
              props.setclose(false);
              setbidetails([]);
            }}
          >
            Close
          </button>
        </div>

        {/* Bid Details Table */}
        <h4>Bid Details</h4>
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
                  <th
                    style={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      border: "2px solid #ccc",
                    }}
                  >
                    Businessman Name
                  </th>
                  <th style={{ border: "2px solid #ccc" }}>Bid Amount</th>
                  <th
                    style={{
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      border: "2px solid #ccc",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {bidetails.length > 0? (
                  bidetails .filter((bid) => bid.bid_statusforbusinessman === "TBD").map((bid, index) => (
                    <tr key={index} style={{ borderBottom: "2px solid #ccc" }}>
                      <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                        {bid.businessman.name}
                      </td>
                      <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                        {bid.bid_amount}
                      </td>
                      <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                        <div className="d-flex align-items-center gap-2">
                          <select
                            className="form-select"
                            onChange={(e) =>
                              handleStatusChange(e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleSaveStatus(bid)}
                          >
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
                      No bids available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBids;