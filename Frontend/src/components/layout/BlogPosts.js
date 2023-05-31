import React, { useState, useEffect } from 'react';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch posts and categories from the backend API
    const fetchPostsAndCategories = async () => {
      try {
        const postsResponse = await fetch('http://localhost:5000/api/posts');
        const categoriesResponse = await fetch('http://localhost:5000/api/categories');

        if (postsResponse.ok && categoriesResponse.ok) {
          const postsData = await postsResponse.json();
          const categoriesData = await categoriesResponse.json();

          setPosts(postsData);
          setCategories(categoriesData);
        } else {
          console.error('Failed to fetch posts and categories');
        }
      } catch (error) {
        console.error('Error occurred during posts and categories fetching:', error);
      }
    };

    fetchPostsAndCategories();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
      <div>
        {categories.map((category) => (
          <div key={category._id} className="mb-6">
            <h3 className="text-xl font-bold mb-2">{category.category_name}</h3>
            {posts
              .filter((post) => post.category_id._id === category._id)
              .map((post) => (
                <div key={post._id} className="border rounded p-4 mb-4">
                  <h4 className="text-lg font-bold mb-2">{post.post_title}</h4>
                  <p className="mb-2">{post.post_content}</p>
                  <p className="text-gray-600">Category: {category.category_name}</p>
                  <p className="text-gray-600">Created At: {post.created_at}</p>
                  <p className="text-gray-600">Created By: {post.created_by}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
