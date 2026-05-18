import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('-questions.correctAnswer');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, type, questions, authorId } = req.body;
    const quiz = await Quiz.create({
      title,
      description,
      type,
      questions,
      author: authorId
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
