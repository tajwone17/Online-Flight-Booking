import React, { useState } from "react";
import axios from "axios";
import validateRegisterInput from "./ValidateRegister";
import './Register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    const validationErrors = validateRegisterInput({ username, email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors and message
    setErrors({});
    setMessage("");

    try {
      // Send a POST request to the backend to register the user
      const response = await axios.post("http://localhost:3001/auth/signup", {
        email,
        password,
        username,
      });

      // Store the JWT token (optional: save in localStorage for persistence)
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Success message
      setMessage("Successfully Registered.");

      // Navigate to the login page after registration
      setTimeout(() => {
        navigate("/login");
      }, 1000); // Optional delay for showing the success message

    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 409) {
        setErrors({ email: "Email already exists" });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
  };

  return (
    <div className="user-register-container">
      <div className="user-register-box">
        <h2 className="user-register-title">User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
          {message && <p className="success-text">{message}</p>}
          {errors.general && <p className="error-text">{errors.general}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
