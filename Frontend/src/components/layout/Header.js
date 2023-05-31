import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({isLogin, handleLogout}) => {
  
  const navigate = useNavigate();
  const logOut = ()=>{
    handleLogout();
    navigate('/')
  }

  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          {!isLogin?
          <li>
            <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
          </li>:<></>}
          <li>
            <Link to="/add-category" className="text-white hover:text-gray-300">Add Categories</Link>
          </li>
          <li>
            <Link to="/add-post" className="text-white hover:text-gray-300">Add Post</Link>
          </li>
          {!isLogin?
          <li>
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          </li>:<>
          <li>
            <Link to="/category-list" className="text-white hover:text-gray-300">Category List</Link>
          </li>
          <li>
            <Link to="/post-list" className="text-white hover:text-gray-300">Post List</Link>
          </li>
          <li>
            <Link to="/change-password" className="text-white hover:text-gray-300">Change Password</Link>
          </li>
          <li>
          <button onClick={logOut} className="text-white hover:text-gray-300">Logout</button>
        </li></>}
        </ul> 
      </nav>
    </header>
  );
};

export default Header;
