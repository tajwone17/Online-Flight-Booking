import { isLoggedIn } from "../../Constant/isLoggedIn";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const f_class = searchData.f_class;

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/search-flights",
          {
            params: searchData,
          }
        );
      
        setFlights(response.data.flights);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flight data:", error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchData]);

  const handleBuyClick = (fid, fare) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/passenger-details", {
        state: { flight_id: fid, fare: fare, f_class: f_class },
      });
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
              {flights.map((flight) => {
                const departureDate = new Date(flight.departure);
                const isPast = departureDate < new Date();
                return (
                  <tr key={flight.flight_id}>
                    <td>{flight.airline}</td>
                    <td>{departureDate.toLocaleString()}</td>
                    <td>{new Date(flight.arrivale).toLocaleString()}</td>
                    <td>${flight.fare}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          handleBuyClick(flight.flight_id, flight.fare)
                        }
                        disabled={isPast}
                      >
                        {isPast ? "Unavailable" : "Buy"}
                      </button>
                    </td>
                  </tr>
                );
              })}
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
