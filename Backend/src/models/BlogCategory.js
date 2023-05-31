const mongoose = require('mongoose');

const blogCategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  meta_title: {
    type: String,
    required: true,
  },
  meta_description: {
    type: String,
    required: true,
  },
  meta_keywords: {
    type: String,
    required: true,
  },
});

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);

module.exports = BlogCategory;
