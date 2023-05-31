import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPostPage = () => {
  const navigate = useNavigate();
  const { postID } = useParams();
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch post data from the backend API
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postID}`,{credentials:'include'});
        if (response.ok) {
          const data = await response.json();
          setPostTitle(data.post_title);
          setPostContent(data.post_content);
          setCategoryId(data.category_id._id);
        } else {
          console.error('Failed to fetch post');
        }
      } catch (error) {
        console.error('Error occurred during post fetching:', error);
      }
    };

    fetchPost();
    fetchCategories();
    // console.log(categories)

  }, [postID]);


  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories/');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Make API request to update the post
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postID}`, {
        method: 'PUT',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_title: postTitle,
          post_content: postContent,
          category_id: categoryId,
        }),
      });

      if (response.ok) {
        // Post update success logic, e.g., show a success message or redirect to post list
        console.log('Post updated successfully');
        navigate('/post-list');
      } else {
        // Post update error logic
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error occurred during post update:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="postTitle" className="block text-gray-700 font-bold mb-2">
              Post Title
            </label>
            <input
              type="text"
              id="postTitle"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={postTitle}
              onChange={handlePostTitleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postContent" className="block text-gray-700 font-bold mb-2">
              Post Content
            </label>
            <textarea
              id="postContent"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={postContent}
              onChange={handlePostContentChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="categoryId" className="block text-gray-700 font-bold mb-2">
              Category
            </label>
            <select
              id="categoryId"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryId}
              onChange={handleCategoryIdChange}
            >
              <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
