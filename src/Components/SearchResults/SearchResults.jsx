import { isLoggedIn } from "../../Constant/isLoggedIn";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css";
import Footer from "../Footer/Footer";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/search-flights",
          {
            params: searchData,
          }
        );
        console.log(response.data)
        setFlights(response.data.flights);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight data:", error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchData]);

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/passenger-details");
    }
  };

  return (
    <div className="text-center p-4 bg-light sr-container">
      <h2>
        Flights from: {searchData.dep_city} to {searchData.arr_city}
      </h2>
      {loading ? (
        <p>Loading flights...</p>
      ) : flights.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-secondary">
              <tr>
                <th>Airline</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Fare</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight, index) => (
                <tr key={index}>
                  <td>{flight.airline}</td>
                  <td>{new Date(flight.departure).toLocaleString()}</td>
                  <td>{new Date(flight.arrivale).toLocaleString()}</td>
                  <td>${flight.fare * searchData.passengers}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={handleBuyClick}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No flights found for the selected criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
