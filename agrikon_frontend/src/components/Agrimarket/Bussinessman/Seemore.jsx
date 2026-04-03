import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/popup.css";
import axios from "axios";

const Seemore = (props) => {
  const [bidetails, setbidetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('http://localhost:8000/businessbid/', {
          params: {
            crop_id: props.crop.id,
            condition: "pdiddy"
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('authToken'),
            usertype: localStorage.getItem('usertype'),
            userid: localStorage.getItem('userid'),
          },
        });

        const data = response.data.details || [];
        setbidetails(data);
        
      } catch (error) {
        console.error('Error fetching bidded crop IDs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (props.trigger && props.crop?.id) {
      fetchBids();
    }
  }, [props.trigger, props.crop]);

  if (!props.trigger || loading) return null;

  return (
    <div className="popup">
      <div className="container mt-4 p-3 border rounded popup-inner">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-start border-bottom pb-3">
          <div className="d-flex align-items-center">
            <img
              src={`http://localhost:8000/${props.crop.addedbyuser.profile_picture}`}
              alt="Farmer"
              className="me-3"
              style={{ width: "170px", height: "200px", objectFit: "cover" }}
            />
            <div>
              <h5 className="mb-1">{props.crop.addedbyuser.name}</h5>
              <p className="mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eligendi
                non quis exercitationem culpa nesciunt nihil aut nostrum explicabo
                reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
                Voluptatum ducimus voluptates voluptas?
              </p>
            </div>
          </div>
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

        {/* Crop Images Section */}
        <div className="mt-4">
          <h5>Crop Image</h5>
          <div className="d-flex flex-wrap">
            <img
              src={`http://localhost:8000/${props.crop.cropimages}`}
              alt="Crop"
              className="img-thumbnail me-2 mb-2"
              style={{ width: "250px", height: "250px" }}
            />
          </div>
        </div>

        {/* Bid Details Section */}
        <h4>Bid Details</h4>
        <div className="mt-0">
          <div className="table-responsive">
            <table
              className="crop-table"
              style={{
                borderCollapse: 'collapse',
                border: "none",
                width: '100%',
                marginTop: '1rem',
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
                    Bidding Status
                  </th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {bidetails.length > 0 ? (
                  bidetails.map((bids, index) => (
                    <tr key={index} style={{ borderBottom: "2px solid #ccc" }}>
                      <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                        {bids.businessman.name}
                      </td>
                      <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                        {bids.bid_amount}
                      </td>
                      <td className="crop-row-bg" style={{ border: "2px solid #ccc" }}>
                        {bids.bid_statusforbusinessman}
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

        {/* Crop Description Section */}
        <div className="mt-4">
          <h5>Crop Description (by farmer):</h5>
          <textarea
            className="form-control"
            rows="4"
            disabled
            value={props.crop.cropdescription}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Seemore;