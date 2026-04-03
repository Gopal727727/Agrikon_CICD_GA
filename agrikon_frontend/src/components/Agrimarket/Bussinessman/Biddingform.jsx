import React, { useState, useEffect } from 'react';
import "../../../css/popup.css";
import axios from 'axios';
import { toast } from 'react-toastify';
const Biddingform = (props) => {

  const [bidamount, setbidamount] = useState(0);
  const [biddedamount, setbiddedamount] = useState(0);

  const changebidamount = (e) => {
    setbidamount(e.target.value);
  };


  useEffect(() => {
    const fetchBiddedCropamount = async () => {

      try {
        const response = await axios.get('http://localhost:8000/businessbid/', {
          params: {
            businessman_id: localStorage.getItem("userid"),
            crop_id: props.crop.id
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('authToken'),
            usertype: localStorage.getItem('usertype'),
            userid: localStorage.getItem('userid'),
          },
        });
        setbiddedamount(response.data.details[0].bid_amount);
      } catch (error) {
        console.error('Error fetching bidded crop IDs:', error);
      }
    };

    fetchBiddedCropamount();
  }, [props.crop, bidamount]);



  const submitbid = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      businessman: localStorage.getItem("userid"),
      crop_name: props.crop.id,
      bid_amount: bidamount

    };


   if (props.edit === true) {
        try {
          const response = await axios.patch('http://localhost:8000/businessbid/', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem("authToken"),
              usertype: localStorage.getItem("usertype"),
              userid: localStorage.getItem("userid")
            },
          });

          if (response.data.errors) {
            toast.error("Bid not updated ",{theme:"colored"});
          } else {
            toast.success('Bid updated successfully',{theme:'colored'});
            props.setclose(false);
            setbidamount(0);
          }
        } catch (error) {
          console.error("Error: ", error);
        }
      } else {
        try {
          const response = await axios.post('http://localhost:8000/businessbid/', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem("authToken"),
              usertype: localStorage.getItem("usertype"),
              userid: localStorage.getItem("userid")
            },
            params: {
              cropid: formDataToSend.crop_name,  // or use props.crop.id if appropriate
            },
          });

          if (response.data.errors) {
            toast.error("Bid not added ",{theme:"colored"});
          } else {
            toast.success('Bid placed successfully',{theme:"colored"});
            props.setclose(false);
            setbidamount(0);

            // Add the crop ID to biddedCropIds
            props.setBiddedCropIds((prev) => [...prev, props.crop.id]);
          }
        } catch (error) {
          console.error("Error: ", error);
        }
      }

  };

  return props.trigger ? (
    <div className='popup'>
      <div className="container mt-5 p-4 popup-inner" style={{ backgroundColor: '#f0f8ff', borderRadius: '10px', maxWidth: '600px', border: '1px solid #ddd' }}>
        <div className="position-relative mb-4">
          <h3 className="fw-bold text-center m-0" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            {props.edit ? "Bid Editing Form" : "Bidding Form"}
          </h3>
          <button className="btn-close position-absolute top-0 end-0" aria-label="Close" onClick={() => props.setclose(false)}></button>
        </div>

        <form>
          <div className="row mb-3">
            <div>
              {props.edit ? `Your previous Bid Amount = ${biddedamount}` : ""}
            </div>

            <div className="col-md-6">
              <label htmlFor="bidAmount" className="form-label fw-bold">Bid Amount:</label>
              <input
                type="number"
                className="form-control p-3"
                id="bidAmount"
                placeholder="Your Bid Amount"
                min={1}
                value={bidamount}
                onChange={changebidamount}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn px-4 py-3 fw-bold"
              style={{ borderRadius: '20px', backgroundColor: "#ff8418" }}
              onClick={submitbid}
            >
              {props.edit ? "Edit Bid" : "Add Bid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : "";
};

export default Biddingform;