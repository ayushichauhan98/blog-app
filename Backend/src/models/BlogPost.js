const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  post_title: {
    type: String,
    required: true,
  },
  post_content: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogCategory',
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'AdminUser',
    type : String,
    required: true,
  },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
