import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { api, checkServerHealth } from '../api';
import io from 'socket.io-client';
import { 
  Send, 
  MessageSquare, 
  Terminal, 
  Search, 
  Shield, 
  Wifi, 
  WifiOff 
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'sonner';

export default function Chat() {
  const { user, isServerOnline, probeServer } = useAuthStore();
  
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const socketRef = useRef(null);
  const scrollRef = useRef(null);

  // MOCK CHANNELS DEFAULT LIST
  const defaultOfflineChannels = [
    { id: 'u_2', name: 'Dr. Ramesh Kumar', role: 'teacher', avatar: 'RK', branch: 'Physics & Electrostatics' },
    { id: 'u_3', name: 'Prof. Sneha Sharma', role: 'teacher', avatar: 'SS', branch: 'Data Structures Lab' },
    { id: 'u_4', name: 'Rahul Varma', role: 'senior', avatar: 'RV', branch: 'Placement Committee Head' }
  ];

  const defaultStudentChannels = [
    { id: 'u_1', name: 'Kunal Mahajan', role: 'student', avatar: 'KM', branch: 'Information Technology' },
    { id: 'u_5', name: 'Aditya Sen', role: 'student', avatar: 'AS', branch: 'Computer Engineering' }
  ];

  // CALCULATE A UNIQUE CRYPTO ROOM HASH FOR PAIR
  const getRoomHash = (id1, id2) => {
    return [id1, id2].sort().join('_');
  };

  useEffect(() => {
    probeServer();
    
    // BUILD USER TIMELINE (TEACHER VIEW VS STUDENT VIEW)
    if (user?.role === 'teacher') {
      setChannels(defaultStudentChannels);
    } else {
      setChannels(defaultOfflineChannels);
    }

    // ESTABLISH SOCKET.IO-CLIENT INSTANCE
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('connect', () => {
      console.log('Socket link active:', socketRef.current.id);
    });

    // CAPTURE INCOMING WEBSOCKET TEXTS
    socketRef.current.on('receive_message', (msg) => {
      setMessages((prev) => {
        // Avoid duplications
        if (prev.find(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
      // Scroll to bottom on receiving message
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  // ACTION: JOIN SPECIFIC ROOM
  const handleSelectChannel = async (chan) => {
    setSelectedChannel(chan);
    const room = getRoomHash(user.id, chan.id);

    // Socket: Join the unique room channel
    socketRef.current?.emit('join_room', room);

    // Try to load historical archives from MongoDB
    try {
      const online = await checkServerHealth();
      if (online) {
        const history = await api.messages.getByRoom(room);
        setMessages(history);
      } else {
        // Fallback: Populate static welcome message
        setMessages([
          {
            _id: 'm_welcome',
            sender: { _id: chan.id, name: chan.name, role: chan.role, avatar: chan.avatar },
            content: `Handshake established securely. Welcome to the chat room for ${chan.name}. [Offline local sandbox mode activated]`
          }
        ]);
      }
    } catch (err) {
      console.error("Historical chat retrieval failed:", err);
    }

    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // ACTION: SUBMIT DIRECT TEXT TO CHANNEL
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedChannel) return;

    const room = getRoomHash(user.id, selectedChannel.id);
    const messagePacket = {
      senderId: user.id,
      receiverId: selectedChannel.id,
      room,
      content: inputValue.trim()
    };

    const online = await checkServerHealth();
    if (online) {
      // Fire via live WebSockets
      socketRef.current?.emit('send_message', messagePacket);
    } else {
      // Sandbox fallback append
      const fakeMsg = {
        _id: `m_${Date.now()}`,
        sender: { _id: user.id, name: user.name, role: user.role, avatar: user.avatar },
        content: inputValue.trim()
      };
      setMessages((prev) => [...prev, fakeMsg]);
      toast.success("Packet queued locally (offline mode)");
    }

    setInputValue('');
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const filteredChannels = channels.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-120px)] select-none text-slate-800 dark:text-slate-100 transition-all duration-300">
      {/* SIDE CHANNELS ROSTER */}
      <div className="md:col-span-4 flex flex-col h-full space-y-4">
        <Card className="p-4 shrink-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Secure Channels
            </h3>
            {isServerOnline ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Wifi className="h-3 w-3" /> LIVE
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-bold bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-slate-200 dark:border-white/5">
                <WifiOff className="h-3 w-3" /> MOCK
              </span>
            )}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search peer nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </Card>

        {/* CHANNELS ACCORDION LIST */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {filteredChannels.map((chan) => {
            const isSelected = selectedChannel?.id === chan.id;
            return (
              <motion.div
                key={chan.id}
                onClick={() => handleSelectChannel(chan)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  isSelected 
                    ? 'bg-primary/10 border-primary/45 text-primary dark:text-white shadow-sm' 
                    : 'bg-white dark:bg-slate-955/20 border-slate-200 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-950/40'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center font-extrabold text-sm text-white">
                  {chan.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-800 dark:text-white text-xs truncate">{chan.name}</h4>
                    <span className="text-[9px] font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10 uppercase tracking-wider scale-90">
                      {chan.role}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{chan.branch}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CHAT VIEW TIMELINE */}
      <div className="md:col-span-8 flex flex-col h-full">
        {selectedChannel ? (
          <Card className="flex flex-col h-full p-4 overflow-hidden relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />

            {/* CHANNEL HEADER */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/5 shrink-0 justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  {selectedChannel.avatar}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-850 dark:text-white text-sm">{selectedChannel.name}</h3>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">SEC_ROOM: {getRoomHash(user.id, selectedChannel.id).slice(0, 15)}...</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400 dark:text-slate-500 font-mono">
                <Shield className="h-3.5 w-3.5 text-primary" /> End-to-End Encrypted
              </div>
            </div>

            {/* SCROLLING CONVO WINDOW */}
            <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isMe = msg.sender?._id === user.id || msg.sender === user.id;
                  return (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] rounded-2xl p-3 border text-xs leading-relaxed ${
                        isMe 
                          ? 'bg-primary border-primary/30 text-white rounded-tr-none shadow-sm' 
                          : 'bg-slate-100 dark:bg-slate-950/60 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-200 rounded-tl-none'
                      }`}>
                        {!isMe && (
                          <span className="block text-[9px] font-mono font-bold text-primary mb-1 uppercase tracking-wider">
                            {msg.sender?.name || 'Peer Node'}
                          </span>
                        )}
                        <p>{msg.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={scrollRef} />
            </div>

            {/* MESSAGE ENTRY FORM */}
            <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0 border-t border-slate-200 dark:border-white/5 pt-3">
              <input 
                type="text" 
                placeholder={`Transmit telemetry packets to ${selectedChannel.name}...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <Button type="submit" variant="primary" className="py-2.5 shrink-0 flex items-center justify-center gap-1.5 font-bold shadow-sm">
                Send <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center text-center p-8 h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 rounded-2xl shadow-sm">
            <Terminal className="h-16 w-16 text-slate-400 dark:text-slate-600 mb-4 animate-pulse" />
            <h3 className="text-lg font-extrabold text-slate-850 dark:text-white">Encryption Handshake Required</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-2 leading-relaxed">
              Select a verified educator or student peer node from the directory list on the left to initialize a secure Socket.io transmission session.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
