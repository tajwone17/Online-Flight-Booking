import React from "react";
// import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About us</h1>
      <p className="about-intro">
        Welcome to our advanced Flight Booking System, your ultimate platform for hassle-free travel planning. 
        Whether you're booking a business trip or a family vacation, we make it seamless, efficient, and user-friendly.
      </p>
      <div className="about-features">
        <h1>Features</h1>
        <ul>
          <li>
            <strong>Real-time Flight Availability:</strong> Browse flights with up-to-date schedules and seat availability.
          </li>
          <li>
            <strong>Flexible Search:</strong> Filter flights by date, destination, price range, and airline preference.
          </li>
          <li>
            <strong>Secure Payments:</strong> Make transactions with top-tier security for peace of mind.
          </li>
          <li>
            <strong>Class Options:</strong> Choose from Economy, Business, or First Class seats.
          </li>
          <li>
            <strong>Multi-Platform Access:</strong> Access the platform on desktop, tablet, or mobile devices.
          </li>
        </ul>
      </div>
      <div className="about-benefits">
        <h1>Why Choose Us?</h1>
        <p>
          Our system is designed with travelers in mind, ensuring a smooth experience from search to booking.
          Enjoy competitive pricing, easy cancellations, and customer support available 24/7.
        </p>
      </div>
      <div className="about-contact">
        <h1>Contact Us</h1>
        <p clasName="text-light">
          Have questions or need assistance? Reach out to our support team anytime at 
          <a href="mailto:support@flightbooking.com"> support@flightbooking.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
