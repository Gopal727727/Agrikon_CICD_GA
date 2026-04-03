import React, { useState, useEffect } from 'react';
import '../../../css/mybidtable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Seemore from './Seemore';
import Biddingform from './Biddingform';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
// 🔁 Merge Sort Functions
const mergeSort = (arr, comparator) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), comparator);
  const right = mergeSort(arr.slice(mid), comparator);

  return merge(left, right, comparator);
};

const merge = (left, right, comparator) => {
  let result = [], i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (comparator(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
};

function Bidtable() {
  const [selectedSort, setSelectedSort] = useState('Newest First');
  const [trigger, settrigger] = useState(false);
  const [fromtrigger, setformtrigger] = useState(false);
  const [specificcrop, setspecificcrop] = useState("");
  const [crop, setcrop] = useState(null);
  const [cropsData, setcropsdata] = useState([]);
  const [biddedCropIds, setBiddedCropIds] = useState([]);
  const [isedit, setisediting] = useState(false);

  const handelseemore = (crop) => {
    settrigger(true);
    setcrop(crop);
  };


  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/addcrop/", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("authToken"),
            usertype: localStorage.getItem("usertype"),
            userid: localStorage.getItem("userid"),
          },
        });
        setcropsdata(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchCrops();
  }, []);



  useEffect(() => {
    const fetchBiddedCropIds = async () => {
      const businessmanId = localStorage.getItem('userid');

      try {
        const response = await axios.get('http://localhost:8000/businessbid/', {
          params: {
            businessman_id: businessmanId,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('authToken'),
            usertype: localStorage.getItem('usertype'),
            userid: localStorage.getItem('userid'),
          },
        });
        setBiddedCropIds(response.data.crop_ids);
      } catch (error) {
        console.error('Error fetching bidded crop IDs:', error);
      }
    };

    fetchBiddedCropIds();
  }, []);

  // Custom sorting logic using merge sort
  const getDays = (bidTime) => {
    if (!bidTime) return 0;
    const match = bidTime.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const sortedCrops = mergeSort(cropsData, (a, b) => {
    const timeA = getDays(a.bidclosestime);
    const timeB = getDays(b.bidclosestime);
    return selectedSort === 'Newest First' ? timeB - timeA : timeA - timeB;
  });

  return (
    <div>
      {/* Top section */}
      <div className="top-section mt-5">
        {/* Left Search Bar */}
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input type="text" placeholder="Search by crop name" className="search-input" />
        </div>

        {/* Middle Search Bar */}
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input type="text" placeholder="Search for farmer name" className="search-input" />
        </div>

        {/* Sort By Section */}
        <div className="sort-container">
          <label htmlFor="sort" className="sort-label">Sort By:</label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="sort-select"
          >
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-responsive">
          <table className="crop-table">
            <thead className="crop-thead">
              <tr>
                <th>Crop Name</th>
                <th>Total Weight</th>
                <th>Estimated Price</th>
                <th>Farmer Name</th>
                <th>Bid Closes In</th>
                <th>Actions</th>
                <th>Bid Status</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {sortedCrops.map((crop, index) => (
                <tr key={index}>
                  <td className="crop-row-bg">{crop.cropName}</td>
                  <td className="crop-row-bg">{crop.croptotalweight}</td>
                  <td className="crop-row-bg">{crop.cropestimatedprice}</td>
                  <td className="crop-row-bg">{crop.addedbyuser.name}</td>
                  <td className="crop-row-bg">{crop.bidclosestime}</td>
                  <td className="crop-row-bg">
                    <button
                      className="btn action-btn see text-white"
                      style={{
                        backgroundColor: '#ff9500',
                        borderRadius: '20px',
                        marginRight: '10px',
                        width: '100px',
                      }}
                      onClick={() => handelseemore(crop)}
                    >
                      See More
                    </button>

                  {!biddedCropIds.includes(crop.id) && crop.bidstatus === "open" && (
                    <button
                      className="btn action-btn bid text-white"
                      style={{
                        backgroundColor: '#0088ff',
                        borderRadius: '20px',
                        width: '100px',
                      }}
                      onClick={() => {
                        setformtrigger(true);
                        setspecificcrop(crop);
                        setisediting(false);
                      }}
                    >
                      Bid Now
                    </button>
                  )}


                    {biddedCropIds.includes(crop.id) && (
                      <button
                        className="btn action-btn bid text-white"
                        style={{
                          backgroundColor: '#0a1c5af5',
                          borderRadius: '20px',
                          width: '100px',
                        }}
                        onClick={() => {
                          setformtrigger(true);
                          setspecificcrop(crop);
                          setisediting(true);
                        }}
                      >
                        Edit Bid
                      </button>
                    )}
                  </td>
                  <td className="crop-row-bg">
                    <button className={`btn text-white ${crop.bidstatus === "closed" ? "close-btn" : "open-btn"}`}>
                      {crop.bidstatus}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Seemore trigger={trigger} setclose={settrigger} crop={crop} />
      <Biddingform
        trigger={fromtrigger}
        setclose={setformtrigger}
        crop={specificcrop}
        setBiddedCropIds={setBiddedCropIds}
        biddedCropIds={biddedCropIds}
        edit={isedit}
      />
    </div>
  );
}

export default Bidtable;
