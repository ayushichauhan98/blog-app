import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch post data from the server and set it in the state

    const fetchPosts = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/posts/');
  
          if (response.ok) {
            const postsData = await response.json();
            setPosts(postsData);
          } else {
            console.error('Failed to fetch posts');
          }
        } catch (error) {
          console.error('Error occurred during posts fetching:', error);
        }
      };
  
      fetchPosts();

 
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Post List</h2>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-md shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{post.post_title}</h3>
            <p className="text-gray-700 mb-4">Category: {post.category_id.category_name}</p>
            <div className="flex justify-between">
              <Link
                to={`/edit-post/${post._id}`}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </Link>
              {/* <button
                className="text-red-500 hover:text-red-600"
                // Implement delete post logic here
                // onClick={() => handleDeletePost(post.post_id)}
              >
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostListPage;
