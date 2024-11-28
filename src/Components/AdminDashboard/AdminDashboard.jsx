import React, { useState, useEffect } from "react";
import "./AdminDashboard.css"; // Import the CSS file
import { Link } from "react-router-dom";
import axios from "axios";

// Sample static data for the dashboard
const AdminDashboard = () => {
  const [totalP, setTotalP] = useState(0);
  const [totalFlights, setTotalFlights] = useState(0);
  const [totalAirlines, setTotalAirlines] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [todaysFlight, setTodaysFlight] = useState([])

  useEffect(() => {
    // Fetch total passengers and total amount from the backend
    const fetchDashboardData = async () => {
      try {
        const countsResponse = await axios.get(
          "http://localhost:3001/api/dashboard-counts"
        );
        setTotalP(countsResponse.data.totalPassengers);
        setTotalFlights(countsResponse.data.totalFlights);
        setTotalAirlines(countsResponse.data.totalAirlines);
        setTotalAmount(countsResponse.data.totalAmount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };


    // Fetch total passengers and total amount from the backend
    const fetchTodaysFlight = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/todays-flights"
        );
        setTodaysFlight(res.data.flights)
        console.log(res.data.flights)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDashboardData();
    fetchTodaysFlight();
  }, []);

  const [flights] = useState([
    {
      id: 1,
      arrival: "10:00 AM",
      departure: "12:00 PM",
      destination: "New York",
      source: "Los Angeles",
      airline: "Delta",
    },
    {
      id: 2,
      arrival: "11:00 AM",
      departure: "01:00 PM",
      destination: "London",
      source: "Paris",
      airline: "Air France",
    },
    {
      id: 3,
      arrival: "12:00 PM",
      departure: "02:00 PM",
      destination: "Tokyo",
      source: "Seoul",
      airline: "Japan Airlines",
    },
  ]);

  
  return (
    <main
      className="m-5"
      style={{ backgroundColor: "#efefef", padding: "20px" }}
    >
      <div className="container">
        <div className="main-section">
          <div className="dashboard">
            <div className="icon-section">
              <i
                className="fa fa-users icon"
                style={{ backgroundColor: "#34495E" }}
              ></i>
              <p className="text">Total Passengers</p>
              <p>{totalP}</p>
            </div>
          </div>
          <div className="dashboard dashboard-green">
            <div className="icon-section">
              <i
                className="fa fa-money icon"
                style={{ backgroundColor: "#16A085" }}
              ></i>
              <p className="text">Amount</p>
              <p>${totalAmount}</p>
            </div>
          </div>
          <div className="dashboard dashboard-red">
            <div className="icon-section">
              <i
                className="fa fa-plane icon"
                style={{ backgroundColor: "#E74C3C" }}
              ></i>
              <p className="text">Flights</p>
              <p>{totalFlights}</p>
            </div>
          </div>
          <div className="dashboard dashboard-blue">
            <div className="icon-section">
              <i
                className="fa fa-plane fa-rotate-180 icon"
                style={{ backgroundColor: "#2980B9" }}
              ></i>
              <p className="text">Available Airlines</p>
              <p>{totalAirlines}</p>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <p className="text-secondary cardTitle">Today's Flights</p>
            <table className="table-sm table table-hover table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Arrival</th>
                  <th scope="col">Departure</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Source</th>
                  <th scope="col">Airlines</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todaysFlight.map((flight, index) => (
                  <tr key={flight.id}>
                    <td>{index+1}</td>
                    <td>{new Date(flight.arrivale).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td>{new Date(flight.departure).toLocaleTimeString()}</td>
                    <td>{flight.Destination}</td>
                    <td>{flight.source}</td>
                    <td>{flight.airline}</td>
                    <td>
                      <div className="">
                  <Link to={`./manageFlight/${flight.id}`} className="btn btn-primary">Manage Flight</Link>
                     
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <p className="text-secondary cardTitle">Flights Departed Today</p>
            <table className="table-sm table table-hover table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Arrival</th>
                  <th scope="col">Departure</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Source</th>
                  <th scope="col">Airlines</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id}>
                    <td>{flight.id}</td>
                    <td>{flight.arrival}</td>
                    <td>{flight.departure}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.source}</td>
                    <td>{flight.airline}</td>
                    <td>
                      <div className="dropdown mt-0">
                        <button
                          className="btn btn-dark dropdown-toggle"
                          type="button"
                          id={`dropdownMenuButton-${flight.id}`}
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fa fa-ellipsis-v"></i>
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton-${flight.id}`}
                        >
                          <Link className="dropdown-item" to="#flight">
                            Today's flight
                          </Link>
                          <Link className="dropdown-item" to="#issue">
                            Today's flight issues
                          </Link>
                          <Link className="dropdown-item" to="#dep">
                            Flights departed today
                          </Link>
                          <Link className="dropdown-item" to="#arr">
                            Flights arrived today
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <p className="text-secondary cardTitle">Flights Arrived Today</p>
            <table className="table-sm table table-hover table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Arrival</th>
                  <th scope="col">Departure</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Source</th>
                  <th scope="col">Airlines</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id}>
                    <td>{flight.id}</td>
                    <td>{flight.arrival}</td>
                    <td>{flight.departure}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.source}</td>
                    <td>{flight.airline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
