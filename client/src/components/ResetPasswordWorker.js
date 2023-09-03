import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";


const ResetPasswordWorker = () => {
  const navigate = useNavigate();
  const { token,id } = useParams();
  const [password, setPassword] = useState('');
  const handleResetPassword = async () => {
    const response = await fetch(`http://localhost:8080/wedease/reset-password-worker/${id}/${token}`, {
      method: 'POST',
       headers: { Authentication: `Bearer ${token}`,
        'Content-Type': 'application/json', 
        } ,
         body: JSON.stringify({ password }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Password reset successful');
      navigate('/WorkerLogin');
   
    } else {
      alert('Password reset failed');
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <input
        type="password"
        placeholder="New Password"
        autoComplete='off'
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>update Password</button>
    </div>
  );
};

export default ResetPasswordWorker;
