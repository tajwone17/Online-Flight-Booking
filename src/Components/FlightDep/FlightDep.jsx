import React, { useState } from 'react';

const FlightDep = () => {
    
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
        <div>
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
    );
};

export default FlightDep;