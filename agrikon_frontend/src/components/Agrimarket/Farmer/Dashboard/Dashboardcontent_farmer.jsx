import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faBagShopping, faBox, faPager, faStar } from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../../../css/farmerdashboardcontent.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";


const Dashboardcontent_farmer = () => {
    const [userdata, setuserdata] = useState({})
    const totalcropamount = 0
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:8000/addcrop/", {

                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('authToken'),
                        usertype: localStorage.getItem('usertype'),
                        userid: localStorage.getItem('userid'),
                    },

                });

                if (response) {
                    console.log(response.data)
                    setuserdata(response.data)
                }
                else {
                    console.log("errors", response.error)
                }


            } catch (error) {

            }
        }
        fetchdata()
    }, [])





    function createData(date, cropName, quantity, amount, bidstatus, bidcount) {
        return { date, cropName, quantity, amount, bidstatus, bidcount };
    }
    const rows = (userdata.crops || []).map((crop) =>
        createData(
            new Date(crop.cropaddedat).toLocaleDateString(),
            crop.cropName,
            crop.croptotalweight + "kg",
            "Rs. " + crop.cropestimatedprice.toLocaleString(),
            crop.bidstatus,
            crop.bid_count
        )
    );

    // Register ChartJS components
    ChartJS.register(ArcElement, Tooltip, Legend);

    const totalbidsdata = {
        labels: ["Total bids recived", "Total accepted bids", "Total rejected bids"],
        datasets: [
            {
                data: [userdata.total_bids, userdata.accepted_bids, userdata.rejected_bids],
                backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
                hoverOffset: 4,
            },
        ],
    };



    return (
        <div className="mt-3 me-4">
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col-lg-8 col-md-12">
                    <div className="card p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h4>Total's Sales</h4>
                                <p>Sales and Summary</p>
                            </div>
                            <div style={{ marginTop: "-30px" }}>
                                <FontAwesomeIcon icon={faBagShopping} className="farmerdashnav-notification-icon me-3" />
                                <button className="btn btn-outline-secondary" style={{ marginTop: "-10px" }}>
                                    <FontAwesomeIcon icon={faDownload} /> Export
                                </button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className="card p-3" style={{ backgroundColor: "#ffc9c9", minHeight: "12rem" }}>
                                    <div>
                                        <FontAwesomeIcon icon={faBox} className="farmerdashcontent-circle-red rounded-circle" />
                                    </div>
                                    <h5>Rs.{userdata.total_accepted_amount}</h5>
                                    <p>Total crops</p>

                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className="card p-3" style={{ backgroundColor: "#f2ff7b", minHeight: "12rem" }}>
                                    <div>
                                        <FontAwesomeIcon icon={faPager} className="farmerdashcontent-circle-blue rounded-circle" />
                                    </div>
                                    <h5>{userdata.total_bids}</h5>
                                    <p>Total received Bids</p>

                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className="card p-3" style={{ backgroundColor: "#3ed833ff", minHeight: "12rem" }}>
                                    <div>
                                        <FontAwesomeIcon icon={faPager} className="farmerdashcontent-circle-yellow rounded-circle" />
                                    </div>
                                     <h5>{userdata.accepted_bids}</h5>
                                   
                                    <p> Total Accepted  Bids</p>

                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className="card p-3" style={{ backgroundColor: "#ec6580ff", minHeight: "12rem" }}>
                                    <div>
                                        <FontAwesomeIcon icon={faStar} className="farmerdashcontent-circle-blue rounded-circle" />
                                    </div>
                                    <h5>{userdata.rejected_bids}</h5>
                                    <p>Total Rejected Bids</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Blank Div on the Right */}
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="card p-3">
                        <h6>Total's Bids</h6>
                        <div className="text-center py-5">
                            <Doughnut data={totalbidsdata} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Sections */}
            <div className="row">
                {/* Table */}
                <div className="">
                    <div className="card p-3">
                        <div className="d-flex justify-content-between">
                            <h6>Total's Crops So Far</h6>
                            <p className="text-right mb-0">Table</p>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Crop Name</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Bid status</TableCell>
                                        <TableCell align="right">No of bid received </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} style={row.bidstatus == 'closed'? { backgroundColor: "#FF6384" } : { backgroundColor: "#94dde1" }} onClick={() => alert(row)}>
                                            <TableCell component="th" scope="row">{row.date}</TableCell>
                                            <TableCell align="right">{row.cropName}</TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">{row.bidstatus}</TableCell>
                                            <TableCell align="right">{row.bidcount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Dashboardcontent_farmer;