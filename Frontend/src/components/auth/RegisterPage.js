import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({handleLogin}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('admin');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleuserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Make API request to register the admin/user
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, user_role: userRole }),
      });

      if (response.ok) {
        // Registration success logic, e.g., show a success message or redirect to login page
        console.log('Registration successful');
        handleLogin();
        navigate('/');
      } else {
        // Registration error logic
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={handleNameChange}
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="userRole" className="block text-gray-700 font-bold mb-2">
              User Role
            </label>
            <select
              id="userRole"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userRole}
              onChange={handleuserRoleChange}
            >
              <option value='admin'>admin</option>
              <option value='user'>user</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
