// Validation.js
import React from 'react';

const Validations = ({ user_id, user_pass }) => {
    const errors = {};
    if (!user_id) {
        errors.user_id = 'Username/Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user_id) && user_id.length < 4) {
        errors.user_id = 'Enter a valid email or at least 4 characters for username';
    }
    if (!user_pass) {
        errors.user_pass = 'Password is required';
    } else if (user_pass.length < 6) {
        errors.user_pass = 'Password must be at least 6 characters';
    }
    return errors;
};

export default Validations;
