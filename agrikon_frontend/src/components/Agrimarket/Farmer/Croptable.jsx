import React, { useState, useEffect } from 'react';
import '../../../css/mybidtable.css';
import axios from "axios";
import BidStatus from './BidStatus';
import CurrentBids from './CurrentBids';
function Croptable() {
    const [selectedOption, setSelectedOption] = useState(5); // Default to 5
    const [selectedSort, setSelectedSort] = useState('New Crop'); // Default to New Crop
    const [data, setData] = useState([]);
    const [triggerBidStatus, setTriggerBidStatus] = useState(false);
    const [triggerCurrentBids, setTriggerCurrentBids] = useState(false);
    const [crop, setCrop] = useState();
    const [closedCropIds, setClosedCropIds] = useState([]);
    const handelpopup = (crop) => {
        setCrop(crop);
        setTriggerBidStatus(true);
    };

    const handelcurrentbids = (crop) => {
        setCrop(crop);
        setTriggerCurrentBids(true);
    };
    function CountdownTimer({ targetTime, onExpire }) {
    const [remainingTime, setRemainingTime] = useState('00:00:00');

    useEffect(() => {
        const targetDate = new Date(targetTime);

        const timer = setInterval(() => {
            const currentTime = new Date();
            const timeDifference = targetDate - currentTime;

            if (timeDifference <= 0) {
                setRemainingTime('00:00:00');
                clearInterval(timer);
                if (onExpire) onExpire();  // <- Notify parent
                return;
            }

            const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const formattedTime = `${remainingHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

            setRemainingTime(formattedTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTime]);

    return <span>{remainingTime}</span>;
}


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
                setData(response.data.crops);
            } catch (error) {
                console.error("Error fetching crops:", error);
            }
        };

        fetchCrops();
    }, []);

    // Sorting logic based on selectedSort state
    const sortedCrops = [...data].sort((a, b) => {
        return selectedSort === "New Crop" ? b.id - a.id : a.id - b.id;
    });

    return (
        <div>
            <div>
                <h2 className="mb-4 spacing">My Crops Listing</h2>
                <div className="d-flex align-items-center mb-4">
                    {/* Show and Sort By */}
                    <div className="d-flex align-items-center me-4 spacing">
                        <label>
                            <b>Show</b>
                        </label>
                        <select
                            className="form-select ms-2"
                            style={{ width: '70px', fontSize: '12px', backgroundColor: '#D9D9D9' }}
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <label>
                            <b>Sort By</b>
                        </label>
                        <select
                            className="form-select ms-2"
                            style={{ width: '120px', fontSize: '14px', color: '#9c9c9c' }}
                            value={selectedSort}
                            onChange={(e) => setSelectedSort(e.target.value)}
                        >
                            <option value="New Crop">New Crop</option>
                            <option value="Old Crop">Old Crop</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="table-wrapper">
                    <div className="table-responsive">
                        <table className="crop-table" style={{overflow:"auto"}}>
                            <thead className="crop-thead">
                                <tr>
                                    <th>Crop Name</th>
                                    <th>Estimated Price (per kg)</th>
                                    <th>Crop Grade</th>
                                    <th>Total Weight</th>
                                    <th>Current Bid Amount (per kg)</th>
                                    <th>Total Price</th>
                                    <th>Bid Closes In</th>
                                    <th>Bid Status</th>
                                </tr>
                            </thead>
                            <tbody className='tablebody'>
                                {sortedCrops.slice(0, selectedOption).map((crop, index) => (
                                    <tr key={index}>
                                        <td className="crop-row-bg">{crop.cropName}</td>
                                        <td className="crop-row-bg">{crop.cropestimatedprice} per KG</td>
                                        <td className="crop-row-bg">{crop.cropgrade}</td>
                                        <td className="crop-row-bg">{crop.croptotalweight} KG</td>
                                        <td className="crop-row-bg">
                                            <button
                                            className="btn action-btn see text-white"
                                            style={{
                                                backgroundColor: '#ff9500',
                                                borderRadius: '20px',
                                                marginRight: '10px',
                                                width: '100px',
                                            }}
                                            onClick={() => handelcurrentbids(crop)}
                                            >
                                            CurrentBids
                                            </button>
                                        </td>
                                        <td className="crop-row-bg">Rs.{crop.cropestimatedprice * crop.croptotalweight}</td>
                                        <td className="crop-row-bg">
                                            <CountdownTimer
                                                targetTime={crop.bidclosestime}
                                                onExpire={() => {
                                                    if (!closedCropIds.includes(crop.id)) {
                                                        setClosedCropIds(prev => [...prev, crop.id]);
                                                    }
                                                }}
                                            />

                                        </td>
                                       <td className="crop-row-bg">
                                            {crop.bidstatus === "closed" || closedCropIds.includes(crop.id) ? (
                                                <span style={{ color: 'red', fontWeight: 'bold' }}>closed</span>
                                            ) : (
                                                <button
                                                    className="btn text-white open-btn"
                                                    onClick={() => handelpopup(crop)}
                                                >
                                                    {crop.bidstatus}
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <BidStatus trigger={triggerBidStatus} setclose={setTriggerBidStatus} crop={crop} />
            <CurrentBids trigger={triggerCurrentBids} setclose={setTriggerCurrentBids} crop={crop} />
        </div>
    );
}

export default Croptable;
