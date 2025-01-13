import React from "react";
import airtic from '../../Assets/Images/airtic.png';
import './Footer.css'
const Footer = () => {
  return (
    
      <footer className=" mb-0">
        <em>
          <h5 className="text-light text-center p-0 brand mt-2">
            <img src={airtic} height="40px" width="40px" alt="" />
            SkyTrip
          </h5>
        </em>
        <div className="text-light text-center">
          {" "}
          Developed By Tajwone Chowdhury & Sharifur Rashid
        </div>
        <p>----------</p>
      </footer>
      
  );
};

export default Footer;
