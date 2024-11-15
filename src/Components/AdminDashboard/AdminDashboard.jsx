import React, { useState } from 'react';
import './AdminDashboard.css';  // Import the CSS file
import { Link } from "react-router-dom";

// Sample static data for the dashboard
const dashboardData = {
  totalPassengers: 2000,
  totalAmount: 150000,
  totalFlights: 50,
  availableAirlines: 10,
};

const AdminDashboard = () => {
  const [flights] = useState([
    { id: 1, arrival: '10:00 AM', departure: '12:00 PM', destination: 'New York', source: 'Los Angeles', airline: 'Delta' },
    { id: 2, arrival: '11:00 AM', departure: '01:00 PM', destination: 'London', source: 'Paris', airline: 'Air France' },
    { id: 3, arrival: '12:00 PM', departure: '02:00 PM', destination: 'Tokyo', source: 'Seoul', airline: 'Japan Airlines' },
  ]);

  return (
    <main className='m-5' style={{ backgroundColor: '#efefef', padding: '20px' }}>
      <div className="container">
        <div className="main-section">
          <div className="dashboard">
            <div className="icon-section">
              <i className="fa fa-users icon" style={{backgroundColor:"#34495E"}}></i>
              <p className="text">Total Passengers</p>
              <p>{dashboardData.totalPassengers}</p>
            </div>
          </div>
          <div className="dashboard dashboard-green">
            <div className="icon-section">
              <i className="fa fa-money icon" style={{backgroundColor:"#16A085"}}></i>
              <p className="text">Amount</p>
              <p>${dashboardData.totalAmount}</p>
            </div>
          </div>
          <div className="dashboard dashboard-red">
            <div className="icon-section">
              <i className="fa fa-plane icon" style={{backgroundColor:"#E74C3C"}}></i>
              <p className="text">Flights</p>
              <p>{dashboardData.totalFlights}</p>
            </div>
          </div>
          <div className="dashboard dashboard-blue">
            <div className="icon-section">
              <i className="fa fa-plane fa-rotate-180 icon" style={{backgroundColor:"#2980B9"}}></i>
              <p className="text">Available Airlines</p>
              <p>{dashboardData.availableAirlines}</p>
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
                {flights.map((flight) => (
                  <tr key={flight.id}>
                    <td>{flight.id}</td>
                    <td>{flight.arrival}</td>
                    <td>{flight.departure}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.source}</td>
                    <td>{flight.airline}</td>
                    <td>
                      <div className="dropdown mt-0" >
                        <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-option"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <Link className="dropdown-item" to="#flight">Today's flight</Link>
                          <Link className="dropdown-item" to="#issue">Today's flight issues</Link>
                          <Link className="dropdown-item" to="#dep">Flights departed today</Link>
                          <Link className="dropdown-item" to="#arr">Flights arrived today</Link>
                        </div>
                      </div>
                    </td>
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
