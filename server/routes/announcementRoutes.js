import express from 'express';
import Announcement from '../models/Announcement.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, type, authorId } = req.body;
    const announcement = await Announcement.create({
      title,
      content,
      type,
      author: authorId
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
