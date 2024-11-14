import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "../src/Components/Home/Home.jsx";
import About from "./Components/About";
import MyFlight from "./Components/MyFlight/MyFlight.jsx";
import Ticket from "./Components/Ticket/Ticket.jsx";
import Feedback from "./Components/Feedback/Feedback.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login.jsx";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar.js";
import Register from "./Components/Register/Register.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import ManageAirlines from "./Components/ManageAirlines/ManageAirlines.jsx";
import AdminHome from "./Components/AdminHome/AdminHome.jsx";
import AddFlight from "./Components/AddFlight/AddFlight.jsx";
import ListFlights from "./Components/ListFlights/ListFlights.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin login route */}
        <Route
          path="/admin/login"
          element={
            <>
              <AdminNavbar />
              <AdminLogin />
            </>
          }
        />

        {/* Admin panel with AdminNavbar always visible */}
        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavbar />
              <Routes>
                <Route path="home" element={<AdminHome />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manage-airlines" element={<ManageAirlines />} />
                <Route path="add-flight" element={<AddFlight />} />
                <Route path="list-flights" element={<ListFlights />} />
              </Routes>
            </>
          }
        />

        {/* Public routes with regular Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/my_flights" element={<MyFlight />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
