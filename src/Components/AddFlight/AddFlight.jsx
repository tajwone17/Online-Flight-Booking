import React, { useState, useEffect } from "react";
import "./AddFlight.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFlight = () => {
  const [cities, setCities] = useState([]);
  const [airlines, setAirlines] = useState([]);
  
  const [formData, setFormData] = useState({
    sourceDate: "",
    sourceTime: "",
    destDate: "",
    destTime: "",
    depCity: "",
    arrCity: "",
    Bprice: "",
    Eprice: "",
    airlineName: "",
    gate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCitiesAndAirlines = async () => {
      try {
        const cityResponse = await axios.get("http://localhost:3001/api/cities");
        setCities(cityResponse.data.cities);

        const airlineResponse = await axios.get("http://localhost:3001/api/airlines");
        setAirlines(airlineResponse.data.airlines);
      } catch (error) {
        console.error("Error fetching cities and airlines:", error);
      }
    };

    fetchCitiesAndAirlines();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    const departureDateTime = new Date(`${formData.sourceDate}T${formData.sourceTime}`);
    const arrivalDateTime = new Date(`${formData.destDate}T${formData.destTime}`);
    const timeDifference = (arrivalDateTime - departureDateTime) / (1000 * 60 * 60); // Difference in hours

    if (departureDateTime >= arrivalDateTime) {
      formErrors.dateTime = "Departure time must be earlier than the arrival time.";
      isValid = false;
    } else if (timeDifference > 24) {
      formErrors.dateTime = "The time difference between departure and arrival cannot exceed 24 hours.";
      isValid = false;
    }

    if (formData.depCity === formData.arrCity) {
      formErrors.city = "Departure and Arrival cities cannot be the same.";
      isValid = false;
    }

    const bPrice = parseFloat(formData.Bprice);
    const ePrice = parseFloat(formData.Eprice);
    if (isNaN(bPrice) || bPrice <= 0 || bPrice > 10000) {
      formErrors.Bprice = "Business Class Price must be a positive number between $1 and $10,000.";
      isValid = false;
    }
    if (isNaN(ePrice) || ePrice <= 0 || ePrice > 10000) {
      formErrors.Eprice = "Economy Class Price must be a positive number between $1 and $10,000.";
      isValid = false;
    }
    if (ePrice > bPrice) {
      formErrors.pricing = "Economy Class Price cannot exceed Business Class Price.";
      isValid = false;
    }

    const gatePattern = /^\d+[A-Z]$/;
    if (!gatePattern.test(formData.gate)) {
      formErrors.gate = "Gate must follow the format like '2A'.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting!");
      return;
    }

    const adminId = 1;

    // Calculate duration in minutes
    const departureDateTime = new Date(`${formData.sourceDate}T${formData.sourceTime}`);
    const arrivalDateTime = new Date(`${formData.destDate}T${formData.destTime}`);
    const dura = Math.floor((arrivalDateTime - departureDateTime) / (1000 * 60)); // Duration in minutes

    const formDataWithAdmin = {
      ...formData,
      adminId,
      dura, // Add calculated duration to the payload
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/add-flight",
        formDataWithAdmin,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Flight added successfully!");

        setFormData({
          sourceDate: "",
          sourceTime: "",
          destDate: "",
          destTime: "",
          depCity: "",
          arrCity: "",
          Bprice: "",
          Eprice: "",
          airlineName: "",
          gate: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="add-flight-container">
      <h1 className="text-center">ADD FLIGHT DETAILS</h1>

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
              required
              min={today}
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
              required
              min={today}
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

        {/* Cities Section */}
        <div className="form-row">
          <div className="col">
            <select
              name="depCity"
              value={formData.depCity}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Departure City
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>
          <div className="col">
            <select
              name="arrCity"
              value={formData.arrCity}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Arrival City
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price and Gate Section */}
        <div className="form-row">
          <div className="col">
            <input
              placeholder="Business Class Price ($)"
              type="number"
              name="Bprice"
              value={formData.Bprice}
              onChange={handleChange}
              required
            />
            {errors.Bprice && <p className="error-text">{errors.Bprice}</p>}
          </div>
          <div className="col">
            <input
              placeholder="Economy Class Price ($)"
              type="number"
              name="Eprice"
              value={formData.Eprice}
              onChange={handleChange}
              required
            />
            {errors.Eprice && <p className="error-text">{errors.Eprice}</p>}
          </div>
          <div className="col">
            <input
              placeholder="Gate"
              type="text"
              name="gate"
              value={formData.gate}
              onChange={handleChange}
              required
            />
            {errors.gate && <p className="error-text">{errors.gate}</p>}
          </div>
        </div>

        {/* Airline Section */}
        <div className="form-row">
          <div className="col">
            <select
              name="airlineName"
              value={formData.airlineName}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Airline
              </option>
              {airlines.map((airline, index) => (
                <option key={index} value={airline.name}>
                  {airline.name}
                </option>
              ))}
            </select>
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

export default AddFlight;
