import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ProtectedRoute } from "protected-route-react"
import jwtDecode from 'jwt-decode';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import AddCategoryPage from './components/category/AddCategoryPage';
import CategoryListPage from './components/category/CategoryListPage';
import AddPostPage from './components/post/AddPostPage';
import PostListPage from './components/post/PostListPage';
import EditCategoryPage from './components/category/EditCategoryPage';
import EditPostPage from './components/post/EditPostPage';
import ChangePasswordPage from './components/auth/ChangePasswordPage';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import BlogPosts from './components/layout/BlogPosts';


const App = () => {
// useEffect(()=>{
  const [cookies] = useCookies(['token']);
  // console.log(cookies)
  const isAuthenticated = () => {
    const token = cookies.token;
    // console.log(token)
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    }
    return false;
  };
// },[])
  const [isLogin, setIsLogin] = useState(isAuthenticated)
  const handleLogin = () => {
    setIsLogin(true)
  
  }
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },

      });
      const data = await response.json();
      if (response.ok) {
        setIsLogin(false)
        console.log(data)

      } else {
        console.error('Logout failed', data.message);
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  }

  return (
    <Router>
      <Header isLogin={isLogin} handleLogout={handleLogout} />
      <Routes>

        <Route exact path="/" element={<BlogPosts />} />
        <Route exact path="/login" element={<LoginPage handleLogin={handleLogin}/>} />
        <Route exact path="/register" element={<RegisterPage handleLogin={handleLogin}/>} />
        <Route exact path="/add-category" element={<ProtectedRoute isAuthenticated={isLogin}><AddCategoryPage /></ProtectedRoute>} />
        <Route exact path="/category-list" element={<CategoryListPage />} />
        <Route exact path="/add-post" element={<ProtectedRoute isAuthenticated={isLogin}><AddPostPage /></ProtectedRoute>} />
        <Route exact path="/post-list" element={<ProtectedRoute isAuthenticated={isLogin}><PostListPage /></ProtectedRoute>} />
        <Route exact path="/edit-category/:categoryID" element={<ProtectedRoute isAuthenticated={isLogin}><EditCategoryPage /></ProtectedRoute>} />
        <Route exact path="/edit-post/:postID" element={<ProtectedRoute isAuthenticated={isLogin}><EditPostPage /></ProtectedRoute>} />
        <Route exact path="/change-password" element={<ProtectedRoute isAuthenticated={isLogin}><ChangePasswordPage /></ProtectedRoute>} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
