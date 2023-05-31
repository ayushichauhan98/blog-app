import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryID } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

  useEffect(() => {
    // Fetch category data from the backend API
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categories/${categoryID}`,{credentials:'include'});
        if (response.ok) {
          const data = await response.json();
          // setCategory(data);
          setCategoryName(data.category_name);
          setMetaTitle(data.meta_title);
          setMetaDescription(data.meta_description);
          setMetaKeywords(data.meta_keywords);
        } else {
          console.error('Failed to fetch category');
        }
      } catch (error) {
        console.error('Error occurred during category fetching:', error);
      }
    };

    fetchCategory();
   
  }, [categoryID]);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleMetaTitleChange = (event) => {
    setMetaTitle(event.target.value);
  };

  const handleMetaDescriptionChange = (event) => {
    setMetaDescription(event.target.value);
  };

  const handleMetaKeywordsChange = (event) => {
    setMetaKeywords(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Make API request to edit the category
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryID}`, {
        method: 'PUT',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_name: categoryName,
          meta_title: metaTitle,
          meta_description: metaDescription,
          meta_keywords: metaKeywords,
        }),
      });

      if (response.ok) {
        // Category update success logic, e.g., show a success message or redirect to category listing
        console.log('Category updated successfully');
        navigate('/category-list');
      } else {
        // Category update error logic
        console.error('Failed to update category');
      }
    } catch (error) {
      console.error('Error occurred during category update:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryName}
              onChange={handleCategoryNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="metaTitle" className="block text-gray-700 font-bold mb-2">
              Meta Title
            </label>
            <input
              type="text"
              id="metaTitle"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={metaTitle}
              onChange={handleMetaTitleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="metaDescription" className="block text-gray-700 font-bold mb-2">
              Meta Description
            </label>
            <input
              type="text"
              id="metaDescription"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={metaDescription}
              onChange={handleMetaDescriptionChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="metaKeywords" className="block text-gray-700 font-bold mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              id="metaKeywords"
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={metaKeywords}
              onChange={handleMetaKeywordsChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryPage;
