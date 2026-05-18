import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Message from '../models/Message.js';

const router = express.Router();

// RETRIEVE PAST CHAT HISTORIES FOR A ROOM
router.get('/:room', protect, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .populate('sender', 'name avatar role')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOG NEW MESSAGE TO COLLECTION
router.post('/', protect, async (req, res) => {
  try {
    const { room, content, receiverId } = req.body;
    
    if (!room || !content) {
      return res.status(400).json({ message: 'Room and Content required' });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId || null,
      room,
      content
    });

    const populated = await Message.findById(message._id)
      .populate('sender', 'name avatar role');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
