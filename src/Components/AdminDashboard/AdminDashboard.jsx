import React, { useState, useEffect } from "react";
import "./AdminDashboard.css"; // Import the CSS file
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [totalP, setTotalP] = useState(0);
  const [totalFlights, setTotalFlights] = useState(0);
  const [totalAirlines, setTotalAirlines] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [todaysFlight, setTodaysFlight] = useState([]);
  const [departedFlight, setdepartedFlight] = useState([]);
  const [arrivedFlight, setArrivedFlight] = useState([]);
  useEffect(() => {
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

    const fetchTodaysFlight = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/todays-flights");
        setTodaysFlight(res.data.flights);
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchDepartedsFlight = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/departed-flights"
        );
        setdepartedFlight(res.data.flights);
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchArrivedFlight = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/arrived-flights"
        );
        setArrivedFlight(res.data.flights);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDashboardData();
    fetchTodaysFlight();
    fetchDepartedsFlight();
    fetchArrivedFlight();
  }, []);

  return (
    <main
      className="m-5"
      style={{ backgroundColor: "#efefef", padding: "20px" }}
    >
      <div className="container">
        {/* Dashboard Content */}
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
            <div className="d-flex align-items-center justify-content-between">
              <p className="text-secondary cardTitle mb-0">Today's Flights</p>
              <div className="btn-group">
                <button
                  className="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                >
                  <i className="fa fa-ellipsis-v"></i>
                </button>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="#todays-flight">
                    Today's flight
                  </Link>
                  <Link className="dropdown-item" to="#flight-departed-today">
                    Flights departed today
                  </Link>
                  <Link className="dropdown-item" to="#flight-arrived-today">
                    Flights arrived today
                  </Link>
                </div>
              </div>
            </div>
            <div id="todays-flight">
              <table className="table-sm table table-hover table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Departure</th>
                    <th scope="col">Arrival</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Source</th>
                    <th scope="col">Airlines</th>
                    <th >Action</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysFlight.map((flight, index) => (
                    <tr key={flight.id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(flight.departure).toLocaleString("en-US", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>
                        {new Date(flight.arrivale).toLocaleString("en-US", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>{flight.destination}</td>
                      <td>{flight.source}</td>
                      <td>{flight.airline}</td>
                      <td>
                        <Link
                          to={`./manageFlight/${flight.id}`}
                          className="btn btn-success"
                          
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <FlightDep /> */}

        <div id="flight-departed-today" className="card mt-4">
          <div className="card-body">
            <p className="text-secondary cardTitle">Flights Departed Today</p>
            <table className="table-sm table table-hover table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Departure</th>
                  <th scope="col">Arrival</th>

                  <th scope="col">Destination</th>
                  <th scope="col">Source</th>
                  <th scope="col">Airlines</th>
                </tr>
              </thead>
              <tbody>
                {departedFlight.map((flight, index) => (
                  <tr key={flight.id}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(flight.departure).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td>
                      {new Date(flight.arrivale).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>

                    <td>{flight.destination}</td>
                    <td>{flight.source}</td>
                    <td>{flight.airline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="flight-arrived-today" className="card mt-4">
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
                {arrivedFlight.map((flight, index) => (
                  <tr key={flight.id}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(flight.departure).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td>
                      {new Date(flight.arrivale).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>

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
