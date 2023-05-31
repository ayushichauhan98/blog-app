import React, { useState } from 'react';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Perform form submission and send data to the server
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        // Password changed successfully, do something (e.g., show success message)
        console.log('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        // Error changing password, handle accordingly
        console.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
