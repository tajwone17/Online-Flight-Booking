import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { isLoggedIn } from "../../Constant/isLoggedIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import axios from "axios"; // Import Axios

const AdminNavbar = () => {
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [airlineName, setAirlineName] = useState("");
  const [seats, setSeats] = useState("");
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

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing when clicking inside the form
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!airlineName || !seats) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Send data to backend using Axios
    axios
      .post("http://localhost:3001/api/add-airline", { name: airlineName, seats: seats })
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error); // Show error toast
        } else {
          toast.success(response.data.message); // Show success toast
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding airline:", error);
        toast.error("Error adding airline."); // Show error toast if the request fails
      });

    // Reset form values and hide the form after submission
    setAirlineName("");
    setSeats("");
    setShowForm(false);
  };

  return (
    <>
      <nav className="admin-navbar">
        <div className="admin-navbar-left">
          <span className="admin-title fs-2">
            <Link className="admin-nav-link" to="/admin/dashboard">
              ADMIN PANEL
            </Link>
          </span>
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
                <button
                  className="admin-dropdown-button"
                  onClick={() => setShowForm(!showForm)}
                >
                  + Airlines
                </button>
                {showForm && (
                  <div
                    className="admin-dropdown-content"
                    onClick={handleDropdownClick}
                  >
                    <form onSubmit={handleFormSubmit} className="px-2 py-2">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="airline"
                          placeholder="Airline Name"
                          value={airlineName}
                          onChange={(e) => setAirlineName(e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-control mt-3"
                          name="seats"
                          placeholder="Total Seats"
                          value={seats}
                          onChange={(e) => setSeats(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-success w-100">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className="d-flex align-items-center me-5">
                <span className="user-icon me-2 text-white fs-5">
                  <i className="fas fa-user"></i>
                </span>
                <h6 className="username me-3 fw-bold text-white mb-0">
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

      {/* Toast container to display success/error messages */}
      <ToastContainer />
    </>
  );
};

export default AdminNavbar;
