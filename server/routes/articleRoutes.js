import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Article from '../models/Article.js';

const router = express.Router();

// GET ALL ARTICLES
router.get('/', protect, async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'name role avatar')
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// BROADCAST A NEW KNOWLEDGE ARTICLE
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and Content are required' });
    }

    const article = await Article.create({
      title,
      content,
      tags: tags || [],
      author: req.user._id
    });

    const populated = await Article.findById(article._id)
      .populate('author', 'name role avatar');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
