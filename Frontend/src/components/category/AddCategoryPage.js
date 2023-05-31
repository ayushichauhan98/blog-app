import React, { useState } from 'react';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

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

    // Make API request to add a category
    try {
      const response = await fetch('http://localhost:5000/api/categories/', {
        method: 'POST',
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
        // Category creation success logic, e.g., show a success message or redirect to category listing
        setCategoryName('')
        setMetaTitle('')
        setMetaDescription('')
        setMetaKeywords('')
        console.log('Category created successfully');
      } else {
        // Category creation error logic
        console.error('Failed to create category');
      }
    } catch (error) {
      console.error('Error occurred during category creation:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Category</h2>
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
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;
