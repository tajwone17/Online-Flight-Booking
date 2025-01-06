import React, { useState, useEffect } from "react";
import "./AddFlight.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
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
    dura: "",
    Bprice: "",
    Eprice:"",
    airlineName: "",
    // seats: "",  // New field for seats
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
  
    if (departureDateTime >= arrivalDateTime) {
      formErrors.dateTime = "Departure time must be earlier than the arrival time.";
      isValid = false;
    }
  
    // Validate cities
    if (formData.depCity === formData.arrCity) {
      formErrors.city = "Departure and Arrival cities cannot be the same.";
      isValid = false;
    }
  
    // Validate Business Class price
    const bPrice = parseFloat(formData.Bprice);
    if (isNaN(bPrice) || bPrice <= 0 || bPrice > 10000 && ePrice>bPrice) {
      formErrors.Bprice = "Business Class Price must be a positive number between $1 and $10,000.";
      isValid = false;
    }
  
    // Validate Economy Class price
    const ePrice = parseFloat(formData.Eprice);
    if (isNaN(ePrice) || ePrice <= 0 || ePrice > 10000 && ePrice<bPrice) {
      formErrors.Eprice = "Economy Class Price must be a positive number between $1 and $10,000.";
      isValid = false;
    }
  
    // Validate flight duration
    const duration = parseInt(formData.dura);
    if (isNaN(duration) || duration < 30 || duration > 1440) {
      formErrors.dura = "Duration must be between 30 minutes and 24 hours.";
      isValid = false;
    }
  
    setErrors(formErrors);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting!");  // Error toast
      return;  // Don't submit the form if validation fails
    }

    // Add adminId here, could come from authentication context, session, etc.
    const adminId = 1;  // Example: Replace with the actual admin ID dynamically

    const formDataWithAdmin = {
      ...formData,
      adminId,  // Include the adminId in the request body
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
        console.log("Flight Added:", response.data);
        toast.success("Flight added successfully!");  // Success toast

        // Clear form fields after successful submission
        setFormData({
          sourceDate: "",
          sourceTime: "",
          destDate: "",
          destTime: "",
          depCity: "",
          arrCity: "",
          dura: "",
          Bprice: "",
          Eprice: "",
          airlineName: "",
          // seats: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");  // Error toast
    }
  };

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

        {/* Duration, Price, and Seats Section */}
        <div className="form-row">
          <div className="col">
            <input
              placeholder="Duration (minutes)"
              type="number"
              name="dura"
              value={formData.dura}
              onChange={handleChange}
              required
            />
            {errors.dura && <p className="error-text">{errors.dura}</p>}
          </div>
          <div className="col">
            <input
              placeholder=" Business Class Price ($)"
              type="number"
              name="Bprice"
              value={formData.Bprice}
              onChange={handleChange}
              required
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>
          <div className="col">
            <input
              placeholder="Economy Class Price ($)"
              type="number"
              name="Eprice"
              value={formData.Eprice}
              onChange={handleChange}
              required
              min="1"
            />
            {errors.E && <p className="error-text">{errors.seats}</p>}
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

      {/* ToastContainer to display the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddFlight;
