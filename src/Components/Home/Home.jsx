import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import airtic from "../../Assets/Images/airtic.png";
import beach from "../../Assets/Images/beach.svg";
import suitcase from "../../Assets/Images/suitcase.svg";
import wallet from "../../Assets/Images/wallet.svg";
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roundTrip, setRoundTrip] = useState(true);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    dep_city: "",
    arr_city: "",
    dep_date: "",
    ret_date: "",
    f_class: "E",
    passengers: 0, // Added passengers count
  });

  const [value, setValue] = useState(0); // Track the number of passengers
  const navigate = useNavigate();

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

  const handlePlus = () => setValue(value + 1);
  const handleMinus = () => value > 0 && setValue(value - 1);

  const handleTripChange = () => setRoundTrip(false);
  const handleTripChangeRT = () => setRoundTrip(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    const updatedFormData = { ...formData, passengers: value };
    navigate('/searchResults', { state: updatedFormData });
};


  return (
    <>
      <div className="main-agileinfo">
        <h1 className="text-light brand mt-2">
          <img src={airtic} height="105px" width="105px" alt="" />
          Online Flight Booking
        </h1>
        
        <div className="main">
          <div className="con">
            <div className="heading-container">
              <div className="left" onClick={handleTripChangeRT}>
                Round Trip
              </div>
              <div className="right" onClick={handleTripChange}>
                One Way
              </div>
            </div>
            <div className="form-body">
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
                  </div>

                  {roundTrip && (
                    <div className="col">
                      <h6 className="form-name text-black">Return</h6>
                      <input
                        className="form-control"
                        name="ret_date"
                        type="date"
                        value={formData.ret_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

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
                <div className="form-row">
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
                  </div>
                </div>

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
              <img src={beach} alt="" />
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
              <img src={wallet} alt="" />
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
              <img src={suitcase} alt="" />
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
