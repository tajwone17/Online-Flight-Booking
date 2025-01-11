import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "../src/Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import MyFlight from "./Components/MyFlight/MyFlight.jsx";
import Ticket from "./Components/Ticket/Ticket.jsx";
import Feedback from "./Components/Feedback/Feedback.jsx";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login.jsx";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar.jsx";
import Register from "./Components/Register/Register.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";
import ManageAirlines from "./Components/ManageAirlines/ManageAirlines.jsx";

import AddFlight from "./Components/AddFlight/AddFlight.jsx";
import ListFlights from "./Components/ListFlights/ListFlights.jsx";
import SearchResults from "./Components/SearchResults/SearchResults";
import PassengerDetails from "./Components/PassengerDetails/PassengerDetails.jsx";
import PaymentForm from "./Components/PaymentForm/PaymentForm.jsx";
import PassengerList from "./Components/PassengerList/PassengerList.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import ManageFlight from "./Components/ManageFlights/ManageFlight.jsx";
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
                {/* <Route path="home" element={<AdminHome />} /> */}
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manage-airlines" element={<ManageAirlines />} />
                <Route path="add-flight" element={<AddFlight />} />
                <Route path="list-flights" element={<ListFlights />} />
                <Route path="passenger-list/:id" element={<PassengerList />} />
                <Route path="dashboard/manageFlight/:id" element={<ManageFlight/>} />
                <Route path="manage-flights/:id" element={<ManageFlight />} />
              </Routes>
              <Footer/>
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
                <Route path="/searchResults" element={<SearchResults />} />
                <Route path="/about" element={<About />} />
                <Route path="/my_flights" element={<MyFlight />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/passenger-details" element={<PassengerDetails />} />
                <Route path="/payment-form" element={<PaymentForm />} />
              
              </Routes>
              <Footer/>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
