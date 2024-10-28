// TicketComponent.js
import React from 'react';
import './Ticket.css';
import airtic from '../../Assets/Images/airtic.png'
const TicketComponent = () => {
    const tickets = [
        {
            ticket_id: 1,
            flight: {
                airline: "Airline Name",
                source: "City A",
                destination: "City B",
                departure: "2023-10-22 12:45",
                arrival: "2023-10-22 14:30",
                flight_class: "E",
                seat_no: "12A",
            },
            passenger: {
                f_name: "John",
                m_name: "Doe",
                l_name: "Smith",
            },
        },
        // Add more ticket objects as needed
    ];

    return (
       
            <div className="container mb-5">
                <h1 className="text-center text-light mt-4 mb-4">E-TICKETS</h1>

                {tickets.map((ticket) => {
                    const { flight, passenger } = ticket;
                    const dateDep = flight.departure.split(' ')[0];
                    const timeDep = flight.departure.split(' ')[1];
                    const dateArr = flight.arrival.split(' ')[0];
                    const timeArr = flight.arrival.split(' ')[1];
                    const classTxt = flight.flight_class === 'E' ? 'ECONOMY' : 'BUSINESS';

                    return (
                        <div key={ticket.ticket_id} className="row mb-5">
                            <div className="col-8 out">
                                <div className="row">
                                    <div className="col">
                                        <h2 className="text-secondary mb-0 brand">Online Flight Booking</h2>
                                    </div>
                                    <div className="col">
                                        <h2 className="mb-0">{classTxt} CLASS</h2>
                                    </div>
                                </div>
                                <hr />
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <p className="head">Airline</p>
                                        <p className="txt">{flight.airline}</p>
                                    </div>
                                    <div className="col-4">
                                        <p className="head">From</p>
                                        <p className="txt">{flight.source}</p>
                                    </div>
                                    <div className="col-4">
                                        <p className="head">To</p>
                                        <p className="txt">{flight.destination}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-8">
                                        <p className="head">Passenger</p>
                                        <p className="h5 text-uppercase">
                                            {passenger.f_name} {passenger.m_name} {passenger.l_name}
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <p className="head">Board Time</p>
                                        <p className="txt">12:45</p>
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
                                        <p className="txt">{flight.seat_no}</p>
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
                                        <img src={airtic} className="mx-auto d-block" height="200px" width="200px" alt="" />
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
                                    <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </button>
                                    <div className="dropdown-menu">
                                        <button className="btn btn-danger btn-sm">
                                            <i className="fa fa-trash"></i> &nbsp; Cancel Ticket
                                        </button>
                                        <button className="btn w-100 mb-3 btn-primary btn-sm">
                                            <i className="fa fa-print"></i> &nbsp; Print Ticket
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
