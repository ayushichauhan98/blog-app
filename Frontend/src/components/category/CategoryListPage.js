import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories/');

        if (response.ok) {
          const categoriesData = await response.json();
          setCategories(categoriesData);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error occurred during categories fetching:', error);
      }
    };

    fetchCategories();
    // const exampleCategories = [
    //   { category_id: 1, category_name: 'Technology', meta_title: 'Tech', meta_description: 'Tech blogs' },
    //   { category_id: 2, category_name: 'Sports', meta_title: 'Sports', meta_description: 'Sports blogs' },
    // ];

    // setCategories(exampleCategories);
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Category List</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white p-6 rounded-md shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{category.category_name}</h3>
            <p className="text-gray-700 mb-4">{category.meta_description}</p>
            <div className="flex justify-between">
              <Link
                to={`/edit-category/${category._id}`}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </Link>
              {/* <button
                className="text-red-500 hover:text-red-600"
                // Implement delete category logic here
                // onClick={() => handleDeleteCategory(category.category_id)}
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

export default CategoryListPage;
