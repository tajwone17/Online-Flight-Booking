import React, { useState } from "react";
import "./Home.css";
import airtic from "../../Assets/Images/airtic.png";
import beach from "../../Assets/Images/beach.svg";
import suitcase from "../../Assets/Images/suitcase.svg";
import wallet from "../../Assets/Images/wallet.svg";
import Footer from '../../Components/Footer/Footer'
const Home = () => {
  const [roundTrip, setRoundTrip] = useState(true);
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  let [value, setvalue] = useState(0);
  const handlePlus = () => {
    setvalue(value + 1);
  };
  const handleMinus = () => {
    if (value > 0) setvalue(value - 1);
  };
  const handleTripChange = () => {
    setRoundTrip(false);
  };
  const handleTripChangeRT = () => {
    setRoundTrip(true);
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
              <form>
                <div className="from-to">
                  <div className="from mx-n5">
                    <h6 style={{ color: "rgba(255, 255, 255, 0.767)" }}>
                      From
                    </h6>
                    <select
                      name="dep_city"
                      id="dep_city"
                      className="frm-field required "
                    >
                      <option value="0" selected disabled>
                        Departure
                      </option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="to">
                    <h6 style={{ color: "rgba(255, 255, 255, 0.767)" }}>To</h6>
                    <select
                      name="arr_city"
                      id="arr_city"
                      className="frm-field required"
                    >
                      <option value="0" selected disabled>
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
                <div className="clear"></div>

                <div className="date">
                  <div className="depart">
                    <h6 style={{ color: "rgba(255, 255, 255, 0.767)" }}>
                      Depart
                    </h6>
                    <input
                      className="form-control"
                      name="dep_date"
                      type="date"
                      required
                    />
                  </div>

                  {roundTrip && (
                    <div className="return">
                      <h6 style={{ color: "rgba(255, 255, 255, 0.767)" }}>
                        Return
                      </h6>
                      <input
                        className="form-control"
                        name="ret_date"
                        type="date"
                        required
                      />
                    </div>
                  )}
                  <div className="class">
                    <h6 style={{ color: "rgba(255, 255, 255, 0.767)" }}>
                      Class
                    </h6>
                    <select name="f_class" className="frm-field required">
                      <option value="E">Economy</option>
                      <option value="B">Business</option>
                    </select>
                  </div>
                </div>

                <div className="clear"></div>
                <div className="numofppl">
                  <div className="adults">
                    <h3>Passenger</h3>
                    <div className="quantity">
                      <div className="quantity-select">
                        <div
                          className="entry value-minus"
                          onClick={handleMinus}
                        >
                          -
                        </div>
                        <div className="entry value">
                          <span className="p-value">{value}</span>
                        </div>
                        <div
                          className="entry value-plus active"
                          onClick={handlePlus}
                        >
                          +
                        </div>
                        <div className="search-button">
                          <button type="button" className="button btn">
                            Search Flights
                          </button>
                        </div>
                      </div>
                    </div>
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
            {" "}
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
            {" "}
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
   <Footer/>
    </>
  );
};

export default Home;
