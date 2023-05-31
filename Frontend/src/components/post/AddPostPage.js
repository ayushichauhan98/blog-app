import React, { useEffect, useState } from 'react';

const AddPostPage = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    fetchCategories();
  }, []);

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

    try {
      // Perform form submission and send data to the server
      const response = await fetch('http://localhost:5000/api/posts/', {
        method: 'POST',
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
        // Post created successfully, do something (e.g., redirect)
        setPostTitle('')
        setPostContent('')
        setCategoryId('')
        setCategories('')
        console.log('Post created successfully');
      } else {
        // Error creating post, handle accordingly
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Post</h2>
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
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPostPage;
