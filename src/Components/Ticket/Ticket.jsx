import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ticket.css';
import airtic from '../../Assets/Images/airtic.png';

const TicketComponent = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get('http://localhost:3001/api/tickets', {
                    params: { userId },
                });
                console.log(response.data);
                setTickets(response.data.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const handlePrint = (ticketId) => {
        const ticketElement = document.getElementById(`ticket-${ticketId}`);
        if (ticketElement) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Ticket</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                            .out { border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
                        </style>
                    </head>
                    <body>${ticketElement.outerHTML}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    if (tickets.length === 0) {
        return <h2 className="text-center text-light mt-4">No tickets found.</h2>;
    }

    return (
        <div className="container mb-5">
            <h1 className="text-center text-light mt-4 mb-4">E-TICKETS</h1>

            {tickets.map((ticket) => {
                const { ticket_id, departure, arrivale, airline, seat_no, class: classTxt, source, destination, f_name, m_name, l_name } = ticket;
                const departureDateTime = new Date(departure);
                const arrivalDateTime = new Date(arrivale);

                const dateDep = departureDateTime.toLocaleDateString();
                const timeDep = departureDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const dateArr = arrivalDateTime.toLocaleDateString();
                const timeArr = arrivalDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const classType = classTxt === 'E' ? 'ECONOMY' : 'BUSINESS';

                return (
                    <div key={ticket_id} id={`ticket-${ticket_id}`} className="row mb-5">
                        <div className="col-8 out">
                            <div className="row">
                                <div className="col">
                                    <h2 className="text-secondary mb-0 brand">Online Flight Booking</h2>
                                </div>
                                <div className="col">
                                    <h2 className="mb-0">{classType} CLASS</h2>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-4">
                                    <p className="head">Airline</p>
                                    <p className="txt">{airline}</p>
                                </div>
                                <div className="col-4">
                                    <p className="head">From</p>
                                    <p className="txt">{source}</p>
                                </div>
                                <div className="col-4">
                                    <p className="head">To</p>
                                    <p className="txt">{destination}</p>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-8">
                                    <p className="head">Passenger</p>
                                    <p className="h5 text-uppercase">
                                        {f_name} {m_name} {l_name}
                                    </p>
                                </div>
                                <div className="col-4">
                                    <p className="head">Board Time</p>
                                    <p className="txt">{timeDep}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="head">Departure</p>
                                    <p className="txt mb-1">{dateDep}</p>
                                    <p className="h1 font-weight-bold mb-3">{timeDep}</p>
                                </div>
                                <div className="col-3">
                                    <p className="head">Arrival</p>
                                    <p className="txt mb-1">{dateArr}</p>
                                    <p className="h1 font-weight-bold mb-3">{timeArr}</p>
                                </div>
                                <div className="col-3">
                                    <p className="head">Gate</p>
                                    <p className="txt">A22</p>
                                </div>
                                <div className="col-3">
                                    <p className="head">Seat</p>
                                    <p className="txt">{seat_no}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 pl-0" style={{ backgroundColor: '#5D5D81', padding: '20px', borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }}>
                            <div className="row">
                                <div className="col">
                                    <h2 className="text-light text-center brand">Online Flight Booking</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <img src={airtic} className="mx-auto d-block" height="280px" width="200px" alt="" />
                                </div>
                            </div>
                            <div className="row">
                                <h3 className="text-light2 text-center mt-2 mb-0">
                                    Thank you for choosing us. <br /><br />
                                    Please be at the gate at boarding time
                                </h3>
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="dropdown">
                                <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                                    <i className="fa fa-ellipsis-v"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item btn btn-danger btn-sm">
                                        <i className="fa fa-trash"></i> Cancel Ticket
                                    </button>
                                    <button
                                        className="dropdown-item btn w-100 mb-3 btn-primary btn-sm"
                                        onClick={() => handlePrint(ticket_id)}
                                    >
                                        <i className="fa fa-print"></i> Print Ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TicketComponent;
