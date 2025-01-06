import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyFlight.css';

const MyFlight = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage after login
                if (!userId) {
                    setError('User not logged in');
                    setLoading(false);
                    return;
                }
                const response = await axios.get('http://localhost:3001/api/user-flights', {
                    params: { userId },
                });
    
                console.log('Flights fetched successfully:', response.data);
                setFlights(response.data);
            } catch (err) {
                console.error('Error fetching flights:', err.response || err.message);
                setError(err.response?.data?.error || 'Failed to fetch flight details.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchFlights();
    }, []);
    
    const getStatus = (departure, arrival) => {
        const now = new Date();
        const departureTime = new Date(departure);
        const arrivalTime = new Date(arrival);

        if (now < departureTime) {
            return 'Not yet departed';
        } else if (now >= departureTime && now < arrivalTime) {
            return 'Departed';
        } else {
            return 'Arrived';
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div>
            <h2 className="flight-title">FLIGHT STATUS</h2>
            {flights.length === 0 ? (
                <div className="flight-status-card "><strong>No flights found.</strong></div>
            ) : (
                flights.map((flight) => (
                    <div key={flight.flight_id} className="flight-status-card">
                        <div className="flight-details">
                            <div className="flight-location">
                                <h3>{flight.source}</h3>
                                <p>Scheduled Departure:</p>
                                <strong>{new Date(flight.departure).toLocaleDateString()}</strong>
                                <span>{new Date(flight.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="flight-timeline">
                                <span className="dot"></span>
                                <hr />
                                <i className="fa fa-plane"></i>
                            </div>
                            <div className="flight-location">
                                <h3>{flight.Destination}</h3>
                                <p>Scheduled Arrival:</p>
                                <strong>{new Date(flight.arrivale).toLocaleDateString()}</strong>
                                <span>{new Date(flight.arrivale).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className={`status ${getStatus(flight.departure, flight.arrivale).toLowerCase().replace(/ /g, '-')}`}>
                                {getStatus(flight.departure, flight.arrivale)}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyFlight;
