import React, { useState } from 'react';
import Navbar from './Navbar';
import { BASE_URL  as  url} from '../Config';

function Register() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');

  const handleRegister = () => {
    fetch(url+'/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle registration response from the server
        // Display a success message, redirect, etc.
        alert('Registration successful');
        // You can also navigate to the login page or perform other actions
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed. Please check your information.');
      });
  };

  return (
    
    <div className="container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={registerName}
        onChange={(e) => setRegisterName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <br/>
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
