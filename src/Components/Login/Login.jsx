import React from 'react';
import Footer from '../Footer/Footer';
import './Login.css';

const Login = () => {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <div className=" form-out col-md-4 p-4 shadow-sm rounded">
                    <h1 className="text-secondary text-center mb-4">LOG IN PANEL</h1>
                    <form method="POST" className="text-center" action="login/passenger">
                        <div className="form-group mb-3">
                            <label htmlFor="user_id" className="form-label">Username/ Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text  border-0 pr-2">
                                        <i className="fa fa-user text-secondary"></i>
                                    </span>
                                </div>
                                <input type="text" name="user_id" id="user_id" className="loginInput form-control form-controll border-top-0 border-left-0 border-right-0 " required />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="user_pass" className="form-label">Password</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text  border-0 pr-2">
                                        <i className="fa fa-lock text-secondary"></i>
                                    </span>
                                </div>
                                <input type="password" name="user_pass" id="user_pass" className="form-control form-controll border-top-0 border-left-0 border-right-0 .loginInput" required />
                            </div>
                        </div>
                        <div className="text-right mb-4">
                            <a id="reset-pass" href="reset-pwd">Reset Password</a>
                        </div>
                        <div className="d-flex justify-content-between">
                            <a href="register">
                                <button type="button" className="btn btn-info d-flex align-items-center">
                                    <i className="fa fa-user-plus text-light mr-2"></i> Register
                                </button>
                            </a>
                            <button name="login_but" type="submit" className="btn btn-success d-flex align-items-center">
                                <i className="fa fa-lg fa-arrow-right text-light mr-2"></i> Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
