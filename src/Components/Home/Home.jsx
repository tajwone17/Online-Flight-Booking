import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import airtic from "../../Assets/Images/airtic.png";
import beach from "../../Assets/Images/beach.svg";
import suitcase from "../../Assets/Images/suitcase.svg";
import wallet from "../../Assets/Images/wallet.svg";

import { useNavigate } from "react-router-dom";

const Home = () => {
  
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    dep_city: "",
    arr_city: "",
    dep_date: "",
   
    f_class: "E",
 
  });

 
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // Track errors

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityResponse = await axios.get("http://localhost:3001/api/cities");
        setCities(cityResponse.data.cities);
      } catch (error) {
        console.error("Error fetching cities", error);
      }
    };
    fetchCities();
  }, []);




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate cities
    if (!formData.dep_city || !formData.arr_city) {
      formErrors.city = "Both departure and arrival cities must be selected.";
      isValid = false;
    } else if (formData.dep_city === formData.arr_city) {
      formErrors.city = "Departure and arrival cities cannot be the same.";
      isValid = false;
    }

    // Validate dates
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format

    if (formData.dep_date < currentDate) {
      formErrors.dep_date = "Departure date cannot be in the past.";
      isValid = false;
    }

  

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if the form is not valid
    }

    handleSearch();
  };

  const handleSearch = () => {
    const updatedFormData = { ...formData };
    navigate("/searchResults", { state: updatedFormData });
  };

  return (
    <>
      <div className="main-agileinfo">
        <h1 className="text-light brand mt-2">
          <img className="immg" src={airtic} height="105px" width="105px" alt="" />
          Online Flight Booking
        </h1>

        <div className="main">
          <div className="con">
          
            <div className="form-body">
            <div className="heading-container">
           
           <h2 className="heading"><strong>Book Your Flight</strong></h2>
           </div>
              <form onSubmit={handleSubmit} className="flight-form-home">
                {/* From and To Cities Section */}
                <div className="form-row">
                  <div className="col">
                    <h6 className="form-name text-black">From</h6>
                    <select
                      name="dep_city"
                      id="dep_city"
                      className="frm-field required"
                      value={formData.dep_city}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Departure
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
                    <h6 className="form-name text-black">To</h6>
                    <select
                      name="arr_city"
                      id="arr_city"
                      className="frm-field required"
                      value={formData.arr_city}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Arrival
                      </option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date and Class Section */}
                <div className="form-row">
                  <div className="col">
                    <h6 className="form-name text-black">Depart</h6>
                    <input
                      className="form-control"
                      name="dep_date"
                      type="date"
                      value={formData.dep_date}
                      onChange={handleChange}
                      required
                    />
                    {errors.dep_date && <p className="error-text">{errors.dep_date}</p>}
                  </div>

                  
                  <div className="col">
                    <h6 className="form-name text-black">Class</h6>
                    <select
                      name="f_class"
                      className="frm-field required"
                      value={formData.f_class}
                      onChange={handleChange}
                      required
                    >
                      <option value="E">Economy</option>
                      <option value="B">Business</option>
                    </select>
                  </div>
                </div>

                {/* Number of Passengers */}
                {/* <div className="form-row">
                  <div className="col passenger">
                    <h3>Passenger</h3>
                    <div className="quantity">
                      <div className="quantity-select">
                        <div className="entry value-minus" onClick={handleMinus}>-</div>
                        <div className="entry value">
                          <span className="p-value">{value}</span>
                        </div>
                        <div className="entry value-plus active" onClick={handlePlus}>+</div>
                      </div>
                    </div>
                    {errors.passengers && <p className="error-text">{errors.passengers}</p>}
                  </div>
                </div> */}

                <div className="form-row">
                  <div className="col">
                    <button type="submit" className="btn-submit">
                      <i className="fa fa-arrow-right"></i> Search Flights
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-con">
        <div className="intro">
          <div className="des">
            <div className="intro_icon">
              <img className="immg" src={beach} alt="" />
            </div>
            <div className="intro_content">
              <div className="intro_title">Top Destinations</div>
              <div className="intro_subtitle">
                <p>What's on your travel bucket list?</p>
              </div>
            </div>
          </div>
          <div className="des">
            <div className="intro_icon">
              <img className="immg" src={wallet} alt="" />
            </div>
            <div className="intro_content">
              <div className="intro_title">The Best Prices</div>
              <div className="intro_subtitle">
                <p>Visit your favourite places at a reasonable price</p>
              </div>
            </div>
          </div>
          <div className="des">
            <div className="intro_icon">
              <img className="immg" src={suitcase} alt="" />
            </div>
            <div className="intro_content">
              <div className="intro_title">Amazing Services</div>
              <div className="intro_subtitle">
                <p>
                  Great interactions begin with knowing your customers wants and
                  needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
