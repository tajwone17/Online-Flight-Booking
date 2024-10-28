import React from 'react';
import './MyFlight.css';

const MyFlight = () => {
    return (<div>
        <h2 className="flight-title ">FLIGHT STATUS</h2>
        <div className="flight-status-card">
            
            <div className="flight-details">
                <div className="flight-location">
                    <h3>Olisphis</h3>
                    <p>Scheduled Departure:</p>
                    <strong>2022-07-05</strong>
                    <span>10:13</span>
                </div>
                <div className="flight-timeline">
                    <span className="dot"></span>
                    <hr />
                    <i className="fa fa-plane"></i>
                </div>
                <div className="flight-location">
                    <h3>Weling</h3>
                    <p>Scheduled Arrival:</p>
                    <strong>2022-07-05</strong>
                    <span>12:13</span>
                    
                </div>
                <div className="status arrived">Arrived</div>
            </div>
        </div>
        </div>
    );
};

export default MyFlight;
