import React, { useState } from "react";
import "./Feedback.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    email: "",
    q1: "",
    q2: "",
    q3: "",
    rate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, q1, q2, q3, rate } = formData;
    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!q1.trim()) newErrors.q1 = "Answer to Question 1 is required.";
    if (!q2.trim()) newErrors.q2 = "Answer to Question 2 is required.";
    if (!q3.trim()) newErrors.q3 = "Answer to Question 3 is required.";
    if (!rate || isNaN(rate) || rate < 1 || rate > 5) {
      newErrors.rate = "Rating must be a number between 1 and 5.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/feedback", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        toast.success("Thank you for your feedback!");
        setFormData({
          email: "",
          q1: "",
          q2: "",
          q3: "",
          rate: "",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  

  return (
    <div className="feedback-container">
      <h1 className="feedback-title mt-0 ">We value your feedback!</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Question 1 */}
        <div className="form-group">
          <label htmlFor="q1">What did you like about our service?</label>
          <textarea
            name="q1"
            id="q1"
            rows="3"
            value={formData.q1}
            onChange={handleChange}
            placeholder="Your Answer"
            required
          />
          {errors.q1 && <p className="error-text">{errors.q1}</p>}
        </div>

        {/* Question 2 */}
        <div className="form-group">
          <label htmlFor="q2">What can we improve?</label>
          <textarea
            name="q2"
            id="q2"
            rows="3"
            value={formData.q2}
            onChange={handleChange}
            placeholder="Your Answer"
            required
          />
          {errors.q2 && <p className="error-text">{errors.q2}</p>}
        </div>

        {/* Question 3 */}
        <div className="form-group">
          <label htmlFor="q3">Would you recommend us to others? Why or why not?</label>
          <textarea
            name="q3"
            id="q3"
            rows="3"
            value={formData.q3}
            onChange={handleChange}
            placeholder="Your Answer"
            required
          />
          {errors.q3 && <p className="error-text">{errors.q3}</p>}
        </div>

        {/* Rating */}
        <div className="form-group">
          <label htmlFor="rate">Rate Us (1-5)</label>
          <input
            type="number"
            name="rate"
            id="rate"
            value={formData.rate}
            onChange={handleChange}
            placeholder="Enter a number between 1 and 5"
            required
          />
          {errors.rate && <p className="error-text">{errors.rate}</p>}
        </div>

        <button type="submit" className="btn-submit">
          Submit Feedback
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Feedback;
