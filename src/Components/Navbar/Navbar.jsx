import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';


const Navbar = () => {
 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <Link className="navbar-brand" to="/">
        <h5>Home</h5>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse" // Ensure you're using data-bs-toggle for Bootstrap 5
        data-bs-target="#navbarSupportedContent" // Ensure this matches the target ID
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"> {/* Use Bootstrap 5 utility classes */}
          <li className="nav-item">
            <Link className="nav-link" to="/my_flights">
              <h5>My Flights</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ticket">
              <h5>Tickets</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/feedback">
              <h5>Feedback</h5>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              <h5>About</h5>
            </Link>
          </li>
        </ul>

        <div className="dropdown">
          <button 
            className="button btn-secondary dropdown-toggle" 
            type="button" 
            id="dropdownMenuButton" 
            data-bs-toggle="dropdown" // Use data-bs-toggle for Bootstrap 5
            aria-haspopup="true" 
            aria-expanded="false"
          >
            Login
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><Link className="dropdown-item" to="/login" >Passenger</Link></li>
            <li><Link className="dropdown-item" to="/admin/login">Administrator</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
