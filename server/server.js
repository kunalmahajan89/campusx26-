import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Routes
import authRoutes from './routes/authRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

// Message schema for Socket DB persistence
import Message from './models/Message.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/articles', articleRoutes);

app.get('/', (req, res) => {
  res.send('College Connect API is running');
});

// Socket.io for Real-time chat with auto database sync
io.on('connection', (socket) => {
  console.log('A user connected to Socket node:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Socket client ${socket.id} entered channel room ${room}`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { senderId, receiverId, room, content } = data;

      if (senderId && room && content) {
        // Write instantly to Mongoose collection
        const message = await Message.create({
          sender: senderId,
          receiver: receiverId || null,
          room,
          content
        });

        const populated = await Message.findById(message._id)
          .populate('sender', 'name avatar role');

        // Broadcast verified payload to room
        io.to(room).emit('receive_message', populated);
      }
    } catch (error) {
      console.error('Socket Message Persistence Error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-connect';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    server.listen(PORT, () => {
      console.log(`Express and Socket.io server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB database connection error:', err);
  });
