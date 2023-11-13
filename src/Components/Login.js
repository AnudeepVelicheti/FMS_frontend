import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { BASE_URL  as  url} from '../Config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch(url+'/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to login');
        }
      })
      .then((data) => {
        const token = data.accessToken;
        const role=data.role;
        localStorage.setItem('token', token);
        if('admin'==role)
        {
          window.location.href='admin';
        }
        else
        {
        window.location.href = 'fms';
        }
        // Redirect to the file upload page or perform other actions
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
      });
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
