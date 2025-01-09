import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
const PaymentForm = () => {
  const [ccNumber, setCcNumber] = useState('');
  const [ccExp, setCcExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const passengerData = location.state || {};
  // Validate the form fields
  const validateForm = () => {
    const regCardNo = /^[0-9]{12,16}$/;
    const regCVV = /^[0-9]{3,4}$/;
    const regMonth = /^(0[1-9]|1[0-2])$/;
    const regYear = /^[2-9][0-9]$/;
    const [month, year] = ccExp.split('/');

    if (!regCardNo.test(ccNumber)) {
      setError('Enter a valid card number (12-16 digits)');
      return false;
    }
    if (!regCVV.test(cvv)) {
      setError('Enter a valid CVV (3-4 digits)');
      return false;
    }
    if (!regMonth.test(month) || !regYear.test(year)) {
      setError('Enter a valid expiration date (MM/YY)');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Payment successful!');
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <>
     <h1 className="text-center text-white mb-4">Pay Invoice</h1>
    <div className="container my-5 d-flex justify-content-center">
     
      <div 
        className="card shadow" 
        style={{
          width: '400px', // Set a medium width for the card
          height: '400px', // Set a square height for the card
          padding: '2rem', // Adjust padding for the content
        }}
      >
        <div className="card-body">
          <label>Accepted Cards</label>
          <div className="icon-container mb-3">
            <i className="fa fa-cc-visa fa-3x" style={{ color: 'navy' }}></i>
            <i className="fa fa-cc-amex fa-3x" style={{ color: 'blue' }}></i>
            <i className="fa fa-cc-mastercard fa-3x" style={{ color: 'red' }}></i>
            <i className="fa fa-cc-discover fa-3x" style={{ color: 'orange' }}></i>
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
                value={ccNumber}
                onChange={(e) => setCcNumber(e.target.value)}
                required
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="cc-exp">Expiration</label>
                  <input
                    id="cc-exp"
                    type="tel"
                    className="form-control"
                    value={ccExp}
                    onChange={(e) => setCcExp(e.target.value)}
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
                    type="password"
                    className="form-control"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
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
                <i className="fa fa-lock "></i>
              {isSubmitting ? 'Processing…' : 'Pay'}
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
