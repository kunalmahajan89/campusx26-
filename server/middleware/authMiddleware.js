import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from Bearer <token> format
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      // Fetch user profile from database and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found in system instance' });
      }

      return next();
    } catch (error) {
      console.error('JWT Token Verification Error:', error);
      return res.status(401).json({ message: 'Not authorized, secure token decryption failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no access token provided' });
  }
};
