import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";  // Import for getting flight ID from the URL

const ManageFlight = () => {
  const { id: flightId } = useParams();   // Extract flight ID from URL parameters

  const [formData, setFormData] = useState({
    sourceDate: "",
    sourceTime: "",
    destDate: "",
    destTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Parse the date and time inputs
    const departureDateTime = new Date(`${formData.sourceDate}T${formData.sourceTime}`);
    const arrivalDateTime = new Date(`${formData.destDate}T${formData.destTime}`);

    // Calculate the difference in hours
    const timeDifference = (arrivalDateTime - departureDateTime) / (1000 * 60 * 60); // Difference in hours

    // Validate that the time difference is less than or equal to 24 hours
    if (timeDifference > 24) {
      toast.error("Arrival time must be within 24 hours of departure.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/manage-flight/${flightId}`, // Pass flightId in the URL
        formData  // Send form data in the body
      );

      if (response.status === 200) {
        toast.success("Flight details updated successfully!");
        setFormData({
          sourceDate: "",
          sourceTime: "",
          destDate: "",
          destTime: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error updating flight details. Please try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="add-flight-container">
      <h1 className="text-center">Manage Flight</h1>
      <form onSubmit={handleSubmit} className="flight-form">
        {/* Departure Section */}
        <div className="form-row">
          <div className="col">
            <h5 className="form-name text-black">DEPARTURE</h5>
            <input
              type="date"
              name="sourceDate"
              value={formData.sourceDate}
              onChange={handleChange}
              min={today}
              required
            />
            <input
              type="time"
              name="sourceTime"
              value={formData.sourceTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Arrival Section */}
        <div className="form-row">
          <div className="col">
            <h5 className="form-name text-black">ARRIVAL</h5>
            <input
              type="date"
              name="destDate"
              value={formData.destDate}
              onChange={handleChange}
              min={today}
              required
            />
            <input
              type="time"
              name="destTime"
              value={formData.destTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-submit">
          <i className="fa fa-arrow-right"></i> Proceed
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ManageFlight;
