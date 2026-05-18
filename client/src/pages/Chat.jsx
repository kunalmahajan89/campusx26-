import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

// In a real app, this would be an env variable
const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const room = 'global';

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, [room]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const messageData = {
        room,
        author: 'User' + Math.floor(Math.random() * 100),
        content: input,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', messageData);
      setMessages((prev) => [...prev, messageData]);
      setInput('');
    }
  };

  return (
    <div className="flex justify-center px-4 py-6 h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-3xl flex flex-col h-full"
      >
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-2xl font-bold text-white">Global Chat</h2>
          <p className="text-sm text-slate-400">Connect with students and teachers</p>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-white/5 p-3 rounded-xl w-max max-w-[80%]">
              <div className="text-xs text-primary font-bold mb-1">{msg.author} <span className="text-slate-500 font-normal">{msg.time}</span></div>
              <div className="text-slate-200 text-sm">{msg.content}</div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..." 
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-primary"
          />
          <button onClick={sendMessage} className="btn-primary">Send</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
