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
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboardcontent_businessman = () => {

    const [rows, setRows] = useState([]);
    const [statusCounts, setStatusCounts] = useState([0, 0, 0]); // [Accepted, Rejected, TBD]
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const businessman_id = localStorage.getItem("userid");

            try {
                const response = await axios.get("http://localhost:8000/businessbid/", {
                    params: {
                        businessman_id,
                        condition: "summary"
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: localStorage.getItem('authToken'),
                        usertype: localStorage.getItem('usertype'),
                        userid: localStorage.getItem('userid'),
                    },
                });

                if (Array.isArray(response.data.details)) {
                    const formatted = response.data.details.map(bid => ({
                        cropName: bid.crop_name.cropName || "N/A",
                        cropimgurl: bid.crop_name.cropimages || "N/A",
                        quantity: bid.crop_name.croptotalweight || "N/A",
                        bidamount: bid.bid_amount ? parseFloat(bid.bid_amount) : 0,
                        bidstatus: bid.bid_statusforbusinessman || "TBD",
                        pay: bid.pay,
                        cropid: bid.crop_name.id
                    }));


                    const acceptedCount = formatted.filter(bid => bid.bidstatus === "Accepted").length;
                    const rejectedCount = formatted.filter(bid => bid.bidstatus === "Rejected").length;
                    const pendingCount = formatted.filter(bid => bid.bidstatus === "TBD").length;
                    const totalBidAmount = formatted.reduce((sum, bid) => sum + (bid.bidamount || 0), 0);

                    // Save data
                    setRows(formatted);
                    setStatusCounts([acceptedCount, rejectedCount, pendingCount]);
                    setTotalAmount(totalBidAmount);
                } else {
                    console.warn("Unexpected data format from API");
                    setRows([]);
                }
            } catch (error) {
                console.error("Error fetching bids:", error);
            }
        };

        fetchData();
    }, []);


    const totalbidsdata = {
        labels: ["Accepted", "Rejected", "pending"],
        datasets: [
            {
                data: statusCounts,
                backgroundColor: ["#5af45aff", "#e5281bff", "#e5e848ff"],
                hoverOffset: 4,
            },
        ],
    };

    const handleExport = () => {
        const textData = JSON.stringify(rows, null, 2);
        const blob = new Blob([textData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    };



    const handlePayment = (amount, cropid) => {
        if (!window.KhaltiCheckout) {
            alert("Khalti script not loaded yet.");
            return;
        }

        const config = {
            publicKey: 'test_public_key_976d2879a09146299bdc1ce8480fb0de',
            productIdentity: '12345',
            productName: 'Test Product',
            productUrl: 'http://example.com/test',
            eventHandler: {
                onSuccess: async function (payload) {
                    console.log("Payment Successful", payload);
                    try {
                        await axios.patch(
                            "http://localhost:8000/businessbid/",
                            {
                                crop_id: cropid,
                                businessman: localStorage.getItem("userid"),
                                payment: true,
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
                        toast.success("Payment status updated successfully.");
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } catch (error) {
                        console.error("Error updating payment status:", error);
                        toast.error("Failed to update payment status.");
                    }
                },
                onError(error) {
                    console.error("Payment Error", error);
                },
                onClose() {
                    console.log('Widget is closed');
                }
            }
        };

        const checkout = new window.KhaltiCheckout(config);
        checkout.show({ amount: amount * 100 });
    };


    return (
        <div className="mt-3 me-4">
            {/* Header Section */}
            <div className="row mb-4">
                <div className="col-lg-8 col-md-12">
                    <div className="card p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h4> Business Report</h4>
                                <p>Sales and Summary</p>
                            </div>
                            <div style={{ marginTop: "-30px" }}>
                                <FontAwesomeIcon icon={faBagShopping} className="farmerdashnav-notification-icon me-3" />
                                <button
                                    className="btn btn-outline-secondary"
                                    style={{ marginTop: "-10px" }}
                                    onClick={handleExport}
                                >
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
                                    <h5>Npr. {totalAmount}</h5>
                                    <p>Total Bids </p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className="card p-3" style={{ backgroundColor: "#f2ff7b", minHeight: "12rem" }}>
                                    <div>
                                        <FontAwesomeIcon icon={faPager} className="farmerdashcontent-circle-yellow rounded-circle" />
                                    </div>
                                    <h5>{statusCounts[0]}</h5>
                                    <p>Total Accepted Bids</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 mb-3">
                                <div className="card p-3" style={{ backgroundColor: "#a8ccff", minHeight: "12rem" }}>
                                    <div>
                                        <FontAwesomeIcon icon={faStar} className="farmerdashcontent-circle-blue rounded-circle" />
                                    </div>
                                    <h5>{statusCounts[1]}</h5>
                                    <p>Total Rejected Bids </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Doughnut Chart */}
                <div className="col-lg-4 d-none d-lg-block">
                    <div className="card p-3" style={{ height: "100%" }}>
                        <h6>All bid status</h6>
                        <div className="text-center py-5">
                            <Doughnut data={totalbidsdata} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="row">
                <div className=" col-md-12 mb-4">
                    <div className="card p-3">
                        <div className="d-flex justify-content-between">
                            <h6>Total's Crops So Far</h6>
                            <p className="text-right mb-0">Table</p>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Cropname</TableCell>
                                        <TableCell align="right">Crop_Image</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Bid Amount</TableCell>
                                        <TableCell align="right">Bid Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => {
                                        let bgColor = "";
                                        if (row.bidstatus === "Accepted") {
                                            bgColor = "#99e7a1ff";
                                        } else if (row.bidstatus === "Rejected") {
                                            bgColor = "#f05151ff";
                                        } else {
                                            bgColor = "#434040ff"
                                        }

                                        return (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                style={{ backgroundColor: bgColor }}
                                            >
                                                <TableCell component="th" scope="row" style={{ color: "white", fontWeight: 'bolder' }}>
                                                    {row.cropName}
                                                </TableCell>

                                                <TableCell align="right" style={{ color: "white", fontWeight: 'bolder' }}>
                                                    <img
                                                        src={`http://localhost:8000${row.cropimgurl}`}
                                                        alt="Crop"
                                                        style={{ width: "100px", objectFit: "cover" }}
                                                    />
                                                </TableCell>

                                                <TableCell align="right" style={{ color: "white", fontWeight: 'bolder' }}>
                                                    {row.quantity}
                                                </TableCell>

                                                <TableCell align="right" style={{ color: "white", fontWeight: 'bolder' }}>
                                                    {row.bidamount}
                                                </TableCell>

                                                <TableCell align="right" style={{ color: "white", fontWeight: 'bolder' }}>
                                                    {row.bidstatus === "Accepted" && row.pay==false? (
                                                        <button className="btn btn-success" onClick={() => handlePayment(row.bidamount,row.cropid)}>Pay</button>
                                                    ) : (
                                                        row.bidstatus=="Accepted"?"Payment Done":row.bidstatus
                                                    )}

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboardcontent_businessman;
