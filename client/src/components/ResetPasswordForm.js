import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    // Send a request to the backend to reset the password
    const response = await fetch('http://localhost:8080/wedease/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Password reset successful');
      // Redirect to the login page
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordForm;
