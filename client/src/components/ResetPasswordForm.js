import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import "../styles/forms.css";


const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token,id } = useParams();
  const [password, setPassword] = useState('');
  const handleResetPassword = async () => {
    const response = await fetch(`http://localhost:8080/wedease/reset-password/${id}/${token}`, {
      method: 'POST',
       headers: { Authentication: `Bearer ${token}`,
        'Content-Type': 'application/json', 
        } ,
         body: JSON.stringify({ password }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Password reset successful');
      navigate('/LoginForm');
   
    } else {
      alert('Password reset failed');
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Your Password</h2>
      <input
        type="password"
        placeholder="New Password"
        autoComplete="off"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="reset-password-input"
      />
      <button onClick={handleResetPassword} className="reset-password-button">
        Update Password
      </button>
    </div>
  );
};

export default ResetPasswordForm;
