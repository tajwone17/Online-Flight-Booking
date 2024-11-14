import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';
import { isLoggedIn } from "../../Constant/isLoggedIn";
const AdminLogin = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
    window.location.reload();
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/admin/login", { user_id, password });
      const token = response.data.token;
      const admin_uname = response.data.username;
      localStorage.setItem("token", token);
      localStorage.setItem("admin_uname", admin_uname); 
      
      navigate('/admin'); // Redirect to admin dashboard
      window.location.reload();
    } catch (error) {
      alert("Invalid username/email or password.");
    }
  };

  return (
    <div className="admin-login-container ">
      <div className="admin-login-box mt-0 ">
        <h2 className="admin-login-title">ADMIN LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="user_id">Username/Email</label>
            <div className="input-icon">
              <i className="fas fa-user"></i>
              <input 
                type="text" 
                id="user_id" 
                value={user_id} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="Enter username or email"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <i className="fas fa-lock"></i>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
              />
            </div>
          </div>
          {!isLoggedIn ?  <button type="submit" className="login-button">
            <i className="fas fa-arrow-right"></i> Login
          </button>:
           (
            <button 
            className="button danger me-5" 
            type="button" 
            aria-haspopup="true" 
            aria-expanded="false"
            onClick={()=> handleLogout()}
          >
            Logout
          </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
