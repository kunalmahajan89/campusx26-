import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// GET CURRENT USER PROFILE
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE USER PROFILE DETAILS
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.avatar = req.body.avatar || user.avatar;
      
      // Additional custom metadata fields
      user.college = req.body.college || user.college || "Tier-3 Institute of Technology";
      user.branch = req.body.branch || user.branch || "General Engineering";
      user.github = req.body.github || user.github || "github.com";

      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        college: updatedUser.college,
        branch: updatedUser.branch,
        github: updatedUser.github,
        points: updatedUser.points,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// INCREASE USER XP (POINTS) & MANAGE STREAKS
router.post('/xp', protect, async (req, res) => {
  try {
    const { xpAmount } = req.body;
    if (!xpAmount || typeof xpAmount !== 'number') {
      return res.status(400).json({ message: 'Provide a valid numeric XP amount' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    user.points = (user.points || 0) + xpAmount;
    
    // Automatically evaluate milestones and unlock badges
    const badges = new Set(user.badges || ["Rookie"]);
    if (user.points >= 500) badges.add("Alpha Coder");
    if (user.points >= 1200) badges.add("Quiz Master");
    if (user.points >= 2500) badges.add("Team Lead");
    
    user.badges = Array.from(badges);
    user.streak = (user.streak || 1) + 1; // Increment streak dynamically on actions

    await user.save();
    res.json({
      points: user.points,
      badges: user.badges,
      streak: user.streak
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET DESCENDING GLOBAL STANDINGS
router.get('/leaderboard', protect, async (req, res) => {
  try {
    // Sort descending by points (XP)
    const users = await User.find()
      .select('name points badges role')
      .sort({ points: -1 });

    // Populate positions dynamically
    const leaderboard = users.map((user, idx) => ({
      name: user.name,
      xp: user.points || 0,
      badges: user.badges || ["Rookie"],
      role: user.role,
      rank: idx + 1
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
