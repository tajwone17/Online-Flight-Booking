import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { isLoggedIn } from "../../Constant/isLoggedIn";

const AdminNavbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("admin_uname");
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the home page
  };

  useEffect(()=>{
    console.log(isLoggedIn)
  },[])

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <span className="admin-title fs-2">
        <Link className="admin-nav-link" to="/admin"> ADMIN PANEL
        </Link></span>
        {isLoggedIn && (
          <>
            <Link className="admin-nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
            <Link className="admin-nav-link" to="/admin/add-flight">
              Add Flight
            </Link>
            <Link className="admin-nav-link" to="/admin/list-flights">
              List Flights
            </Link>
            <Link className="admin-nav-link" to="/admin/manage-airlines">
              Manage Airlines
            </Link>
          </>
        )}
      </div>
      <div className="admin-navbar-right">
        {isLoggedIn ? (
          <>
            <div className="admin-dropdown">
              <button className="admin-dropdown-button">+ Airlines</button>
              <div className="admin-dropdown-content">
                <Link to="/admin/airlines/add">Add Airline</Link>
                <Link to="/admin/airlines/list">List Airlines</Link>
              </div>
            </div>

             <div className="d-flex align-items-center me-5">
          <span className="user-icon me-2 text-white fs-5"> {/* Larger size with fs-5 */}
            <i className="fas fa-user"></i>
          </span>
          <h6 className="username me-3 fw-bold text-white mb-0"> {/* Use h6 and mb-0 to remove margin below */}
            {username}
          </h6>
          </div>
            <button className="admin-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="admin-go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
