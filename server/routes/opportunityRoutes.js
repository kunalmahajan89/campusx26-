import express from 'express';
import Opportunity from '../models/Opportunity.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, company, description, type, link, authorId } = req.body;
    const opportunity = await Opportunity.create({
      title,
      company,
      description,
      type,
      link,
      author: authorId
    });
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
