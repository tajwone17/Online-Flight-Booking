import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PassengerDetails = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();

    // Check if all fields are filled
    const isFormValid = firstName && middleName && lastName && contactNo && dob;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation or save passenger data if needed
        // After successful form submission, navigate to the payment form
        if (isFormValid) {
            navigate('/payment-form');
        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div 
                className="card p-5 shadow" 
                style={{
                    width: '750px', // Increased width for a larger layout
                    padding: '3rem', // Increased padding for extra height
                }}
            >
                <h1 className="text-center mb-5 mt-0" style={{ fontWeight: 'bold', fontSize: '1.75rem' }}>
                    PASSENGER DETAILS
                </h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label htmlFor="firstName" className="form-label">Firstname</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="firstName" 
                                placeholder="Firstname" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                style={{ height: '45px' }} 
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="middleName" className="form-label">Middlename</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="middleName" 
                                placeholder="Middlename" 
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                style={{ height: '45px' }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="lastName" className="form-label">Lastname</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="lastName" 
                                placeholder="Lastname" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                style={{ height: '45px' }}
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label htmlFor="contactNo" className="form-label">Contact No</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="contactNo" 
                                placeholder="Contact No" 
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                                style={{ height: '45px' }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dob" className="form-label">DOB</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="dob" 
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                style={{ height: '45px' }}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            type="submit" 
                            className="btn btn-success px-4 py-2" 
                            style={{ fontSize: '1.1rem' }}
                            disabled={!isFormValid} // Disable the button if the form is invalid
                        >
                            <i className="fa fa-lg fa-arrow-right text-light"></i> Proceed
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PassengerDetails;
