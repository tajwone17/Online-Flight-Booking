import React, {  useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    exp: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const { passengerData, flight_id, fare, f_class } = location.state || {};
  let { passenger_id } = 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const generateSeatNumber = (f_class) => {
    const availableSeats = {
      E: ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"], // Economy class seats
      B: ["C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"], // Business class seats
    };

    const classSeats = availableSeats[f_class] || [];
    return classSeats.length
      ? classSeats[Math.floor(Math.random() * classSeats.length)]
      : null; // Randomly select a seat
  };

  const validateForm = () => {
    const regCardNo = /^[0-9]{12,16}$/;
    const regCVV = /^[0-9]{3,4}$/;
    const regMonth = /^(0[1-9]|1[0-2])$/;
    const regYear = /^[2-9][0-9]$/;
    const [month, year] = formData.exp.split("/");

    if (!regCardNo.test(formData.cardNumber)) {
      setError("Enter a valid card number (12-16 digits)");
      return false;
    }
    if (!regCVV.test(formData.cvv)) {
      setError("Enter a valid CVV (3-4 digits)");
      return false;
    }
    if (!month || !year || !regMonth.test(month) || !regYear.test(year)) {
      setError("Enter a valid expiration date (MM/YY)");
      return false;
    }
    return true;
  };

  const postPassData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:3001/api/passenger-details",
        {
          ...passengerData,
          userId,
          flight_id,
        }
      );
      passenger_id = response.data.passenger_id;
      
    } catch (error) {
      console.error(error);
    }
  };

  const postPaymentData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.post("http://localhost:3001/api/payment-details", {
        ...formData,
        userId,
        flight_id,
        fare,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const postTicketData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const seat_no = generateSeatNumber(f_class);
      await axios.post("http://localhost:3001/api/ticket", {
        userId,
        flight_id,
        fare,
        passenger_id,
        f_class,
        seat_no,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      await postPassData();  // Wait for passenger data to be posted and passenger_id to be available
      await postPaymentData();
      await postTicketData();  // Only post ticket data after getting the passenger_id
      alert("Payment successful!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <h1 className="text-center text-white mb-4">Pay Invoice</h1>
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="card shadow"
          style={{
            width: "400px",
            height: "400px",
            padding: "2rem",
          }}
        >
          <div className="card-body">
            <label>Accepted Cards</label>
            <div className="icon-container mb-3">
              <i className="fa fa-cc-visa fa-3x" style={{ color: "navy" }}></i>
              <i className="fa fa-cc-amex fa-3x" style={{ color: "blue" }}></i>
              <i
                className="fa fa-cc-mastercard fa-3x"
                style={{ color: "red" }}
              ></i>
              <i
                className="fa fa-cc-discover fa-3x"
                style={{ color: "orange" }}
              ></i>
            </div>
            <hr />
            <form onSubmit={handleSubmit} noValidate>
              {error && <p className="text-danger">{error}</p>}

              <div className="form-group mb-3">
                <label htmlFor="cc-number">Card Number</label>
                <input
                  id="cc-number"
                  type="tel"
                  className="form-control"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="exp">Expiration</label>
                    <input
                      id="exp"
                      type="tel"
                      name="exp"
                      className="form-control"
                      value={formData.exp}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="password"
                      className="form-control"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block text-center"
                  disabled={isSubmitting}
                >
                  <i className="fa fa-lock"></i>{" "}
                  {isSubmitting ? "Processing…" : "Pay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
