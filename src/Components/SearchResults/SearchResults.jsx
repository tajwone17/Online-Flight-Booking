import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Constant/isLoggedIn";
import './SearchResults.css';
import Footer from "../Footer/Footer";

const SearchResults = () => {
  const navigate = useNavigate();

  const flightData = {
    airline: "Aero Airways",
    departure: "2022-07-05 22:14:00",
    arrival: "2022-07-05 23:58:00",
    status: "Not yet Departed",
    fare: "$370",
  };

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/passenger-details");
    }
  };

  return (
    <>
      <div className="text-center p-4 bg-light sr-container">
        <h2>FLIGHTS FROM:</h2>
        <h3>Tredence to Zhotrora</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-secondary">
              <tr>
                <th>Airline</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Status</th>
                <th>Fare</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{flightData.airline}</td>
                <td>{flightData.departure}</td>
                <td>{flightData.arrival}</td>
                <td>{flightData.status}</td>
                <td>{flightData.fare}</td>
                <td>
                  {isLoggedIn ? (
                    <button 
                      className="btn btn-success" 
                      onClick={handleBuyClick}
                    >
                      Buy
                    </button>
                  ) : (
                    <span 
                      style={{ cursor: "pointer", color: "#00796b" }} 
                      onClick={handleBuyClick}
                    >
                      Login to continue
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </>
  );
};

export default SearchResults;
