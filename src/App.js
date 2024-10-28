import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import './index.css'
import Home from '../src/Components/Home/Home.jsx'
import About from "./Components/About";
import MyFlight from './Components/MyFlight/MyFlight.jsx';
import Ticket from "./Components/Ticket/Ticket.jsx";
import Feedback from './Components/Feedback/Feedback.jsx';
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login.jsx";

function App() {
  return (
    <>
      <Router>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/my_flights" element={<MyFlight/>} />
          <Route path="/ticket" element={<Ticket/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
