import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({handleLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

     // Make API request to authenticate user
     try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          // for axios use cookie from server
          // withCredentials: true
        });
        const data = await response.json();
        if (response.ok) {
          handleLogin();
          console.log(data)
          navigate("/")
        } else {
          console.error('Authentication failed',data.message);
        }
      } catch (error) {
        console.error('Error occurred during login:', error);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
