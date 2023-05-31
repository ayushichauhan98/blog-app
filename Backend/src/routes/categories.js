const express = require('express');
const BlogCategory = require('../models/BlogCategory');
const authenticate = require('../middleware/authenticate');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await BlogCategory.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get category By Id
router.get('/:categoryId',
  authenticate,
  async (req, res) => {
    const { categoryId } = req.params;
    try {
      const categories = await BlogCategory.findById(categoryId);
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Add a new category (protected)
router.post('/',
  authenticate,
  [
    check('category_name', 'Category name is required').not().isEmpty(),
    check('meta_title', 'Meta title is required').not().isEmpty(),
    check('meta_description', 'Meta description is required').not().isEmpty(),
    check('meta_keywords', 'Meta keywords is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { category_name, meta_title, meta_description, meta_keywords } = req.body;

      const category = new BlogCategory({
        category_name,
        meta_title,
        meta_description,
        meta_keywords,
      });

      await category.save();

      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Edit a category (protected)
router.put('/:categoryId',
  authenticate,
  [
    check('category_name', 'Category name is required').not().isEmpty(),
    check('meta_title', 'Meta title is required').not().isEmpty(),
    check('meta_description', 'Meta description is required').not().isEmpty(),
    check('meta_keywords', 'Meta keywords is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { category_name, meta_title, meta_description, meta_keywords } = req.body;
      const { categoryId } = req.params;
    
      const category = await BlogCategory.findById(categoryId);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      category.category_name = category_name;
      category.meta_title = meta_title;
      category.meta_description = meta_description;
      category.meta_keywords = meta_keywords;

      await category.save();

      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
