import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightList = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/flights");
        setFlights(response.data.flights); 
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching flight data.");
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleDelete = (flightId) => {
    const toastId = toast.warn(
      <div>
        <p>Are you sure you want to delete this flight?</p>
        <button onClick={() => confirmDelete(flightId, toastId)} className="btn btn-danger me-2">
          Yes
        </button>
        <button onClick={() => toast.dismiss(toastId)} className="btn btn-secondary">
          No
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        toastId: "delete-confirm", 
      }
    );
  };

  const confirmDelete = async (flightId, toastId) => {
    try {
      await axios.delete(`http://localhost:3001/api/flights/${flightId}`);
      setFlights(flights.filter((flight) => flight.flight_id !== flightId));
      toast.success("Flight deleted successfully.");
      toast.dismiss(toastId);  // Dismiss the confirmation toast after successful deletion
    } catch (error) {
      toast.error("Error deleting flight.");
      toast.dismiss(toastId);  // Dismiss the confirmation toast in case of failure
    }
  };

  const handleNavigate = () => {
    navigate('/admin/passenger-list');
  };

  if (loading) {
    return <div className="text-center mt-5">Loading flights...</div>;
  }

  return (
    <main>
      <div className="container-md mt-2">
        <h1 className="display-4 text-center text-white">FLIGHT LIST</h1>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Arrival</th>
              <th scope="col">Departure</th>
              <th scope="col">Source</th>
              <th scope="col">Destination</th>
              <th scope="col">Airline</th>
              <th scope="col">Seats</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flight_id} className="text-center">
                <td scope="row">
                  <button onClick={handleNavigate}>
                    {flight.flight_id}
                  </button>
                </td>
                <td>{flight.arrivale}</td>
                <td>{flight.departure}</td>
                <td>{flight.source}</td>
                <td>{flight.Destination}</td>
                <td>{flight.airline}</td>
                <td>{flight.Seats}</td>
                <td>${flight.Price}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleDelete(flight.flight_id)}
                  >
                    <i className="text-danger fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </main>
  );
};

export default FlightList;
