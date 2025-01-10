import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PassengerDetails = () => {
  const location = useLocation();
  const { flight_id, fare , f_class} = location.state || {};


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Check if all fields are filled
  const { firstName, middleName, lastName, contactNo, dob } = formData;
  const isFormValid = firstName && middleName && lastName && contactNo && dob;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation or save passenger data if needed
    console.log("Form data submitted:", formData);
    // After successful form submission, navigate to the payment form
    if (isFormValid) {
      handleProceed();
    } else {
      alert("Please fill all fields");
    }
  };
  const handleProceed = () => {
    const updatedFormData = { ...formData };
    navigate("/payment-form", { state: { passengerData: updatedFormData, flight_id: flight_id ,fare:fare, f_class: f_class} });

  };
  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card p-5 shadow"
        style={{
          width: "750px", // Increased width for a larger layout
          padding: "3rem", // Increased padding for extra height
        }}
      >
        <h1
          className="text-center mb-5 mt-0"
          style={{ fontWeight: "bold", fontSize: "1.75rem" }}
        >
          PASSENGER DETAILS
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="row mb-4">
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                id="firstName"
                placeholder="Firstname"
                value={formData.firstName}
                onChange={handleChange}
                style={{ height: "45px" }}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="middleName" className="form-label">
                Middlename
              </label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                name="middleName"
                placeholder="Middlename"
                value={formData.middleName}
                onChange={handleChange}
                style={{ height: "45px" }}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                placeholder="Lastname"
                value={formData.lastName}
                onChange={handleChange}
                style={{ height: "45px" }}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="contactNo" className="form-label">
                Contact No
              </label>
              <input
                type="tel"
                className="form-control"
                id="contactNo"
                name="contactNo"
                placeholder="Contact No"
                value={formData.contactNo}
                onChange={handleChange}
                style={{ height: "45px" }}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="dob" className="form-label">
                DOB
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{ height: "45px" }}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success px-4 py-2"
              style={{ fontSize: "1.1rem" }}
              disabled={!isFormValid} // Disable the button if the form is invalid
            >
              <i className="fa fa-lg fa-arrow-right text-light"></i> Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassengerDetails;
