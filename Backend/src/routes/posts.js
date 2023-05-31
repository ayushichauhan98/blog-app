const express = require('express');
const BlogPost = require('../models/BlogPost');
const BlogCategory = require('../models/BlogCategory');
const AdminUser = require('../models/AdminUser');
const authenticate = require('../middleware/authenticate');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('category_id', 'category_name');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Post By Id
router.get('/:postId',
  authenticate,
  async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await BlogPost.findById(postId).populate('category_id', 'category_name');
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Add a new post (protected)
router.post('/',
  authenticate,
  [
    check('post_title', 'Post title is required').not().isEmpty(),
    check('post_content', 'Post content is required').not().isEmpty(),
    check('category_id', 'Category ID is required').not().isEmpty(),
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { post_title, post_content, category_id } = req.body;

      // Fetch the category information
      const category = await BlogCategory.findById(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const { meta_title, meta_description, meta_keywords, category_name } = category;

      // Fetch the user information by id (req.user.id)
      const curUser = await AdminUser.findById(req.user.id);
      if (!category) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { name } = curUser;


      const post = new BlogPost({
        post_title,
        post_content,
        category_id,
        meta_title,
        meta_description,
        meta_keywords,
        created_by: name,
      });

      await post.save();

      res.json({ message: 'Post created successfully', post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Edit a post (protected)
router.put('/:postId',
  authenticate,
  [
    check('post_title', 'Post title is required').not().isEmpty(),
    check('post_content', 'Post content is required').not().isEmpty(),
    check('category_id', 'Category ID is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { post_title, post_content, category_id } = req.body;
      const { postId } = req.params;

      // Fetch the category information
      const category = await BlogCategory.findById(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const { meta_title, meta_description, meta_keywords, category_name } = category;


      const post = await BlogPost.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      post.post_title = post_title;
      post.post_content = post_content;
      post.category_id = category_id;
      post.meta_title = meta_title;
      post.meta_description = meta_description;
      post.meta_keywords = meta_keywords;
      post.updated_at = Date.now();

      await post.save();

      res.json({ message: 'Post Updated successfully' , post});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
