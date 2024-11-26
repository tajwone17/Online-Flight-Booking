import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import validateInput from './Validations';

const Login = () => {
    const [formData, setFormData] = useState({ user_id: '', user_pass: '' });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInput(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:3001/auth/login", formData);
            const { token, username } = response.data; 
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
    
            navigate("/"); 
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoginError("Invalid username/email or password");
            } else {
                setLoginError("Login failed. Please try again.");
            }
        }
    };
    

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <div className="form-out col-md-4 p-4 shadow-sm rounded">
                    <h1 className=" text-center mb-4" style={{color: '#00796b'}}>LOG IN PANEL</h1>
                    <form onSubmit={handleSubmit} className="text-center">
                        <div className="form-group mb-3">
                            <label htmlFor="user_id" className="form-label">Username/ Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text border-0 pr-2">
                                        <i className="fa fa-user text-secondary"></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="user_id"
                                    id="user_id"
                                    className="loginInput form-control border-top-0 border-left-0 border-right-0"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {errors.user_id && <p className="text-danger">{errors.user_id}</p>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="user_pass" className="form-label">Password</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text border-0 pr-2">
                                        <i className="fa fa-lock text-secondary"></i>
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    name="user_pass"
                                    id="user_pass"
                                    className="form-control border-top-0 border-left-0 border-right-0 loginInput"
                                    value={formData.user_pass}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {errors.user_pass && <p className="text-danger">{errors.user_pass}</p>}
                        </div>
                        <div className="d-flex justify-content-between">
                            <Link to="/register">
                                <button type="button" className="btn btn-info d-flex align-items-center">
                                    <i className="fa fa-user-plus text-light mr-2"></i> Register
                                </button>
                            </Link>
                            <button type="submit" className="btn btn-success d-flex align-items-center">
                                <i className="fa fa-lg fa-arrow-right text-light mr-2"></i> Login
                            </button>
                        </div>
                        {loginError && <p className="text-danger mt-3">{loginError}</p>}
                    </form>
                </div>
            </div>
            
        </>
    );
};

export default Login;