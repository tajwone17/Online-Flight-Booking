import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { isLoggedIn } from "../../Constant/isLoggedIn";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <Link className="navbar-brand" to="/">
        <h5 className="ms-3">Home</h5>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {isLoggedIn && (
            <>
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
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              <h5>About</h5>
            </Link>
          </li>
        </ul>

        {!isLoggedIn ? (
          <div className="dropdown">
            <button
              className="button btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Login
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><Link className="dropdown-item" to="/login">Passenger</Link></li>
              <li><Link className="dropdown-item" to="/admin/login">Administrator</Link></li>
            </ul>
          </div>
        ) : (
          <div className="d-flex align-items-center me-5">
          <span className="user-icon me-2 text-white fs-5"> {/* Larger size with fs-5 */}
            <i className="fas fa-user"></i>
          </span>
          <h6 className="username me-5 fw-bold text-white mb-0"> {/* Use h6 and mb-0 to remove margin below */}
            {username}
          </h6>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        
        
        )}
      </div>
    </nav>
  );
};

export default Navbar;
