import React from "react";
import airtic from '../../Assets/Images/airtic.png';
const Footer = () => {
  return (
    
      <footer class="mt-5 mb-0">
        <em>
          <h5 class="text-light text-center p-0 brand mt-2">
            <img src={airtic} height="40px" width="40px" alt="" />
            Online Flight Booking
          </h5>
        </em>
        <div class="text-light text-center">
          {" "}
          Developed By Tajwone Chowdhury & Sharifur Rashid
        </div>
        <p>----------</p>
      </footer>
   
  );
};

export default Footer;
