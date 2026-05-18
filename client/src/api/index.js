const API_BASE = 'http://localhost:5000/api';

// HELPER TO LOAD JWT TOKEN HEADERS
const getHeaders = () => {
  const token = localStorage.getItem('campusx_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// HEALTH CHECK ENGINE FOR LIVE SERVER
export const checkServerHealth = async () => {
  try {
    const res = await fetch(`${API_BASE.replace('/api', '')}`, { method: 'GET' });
    return res.ok;
  } catch (error) {
    return false;
  }
};

export const api = {
  // AUTHENTICATION ENDPOINTS
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Auth failure');
      return await res.json();
    },
    register: async (userData) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Registration failure');
      return await res.json();
    }
  },

  // USER PROFILE & LEADERBOARDS
  users: {
    getProfile: async () => {
      const res = await fetch(`${API_BASE}/users/profile`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to retrieve user node');
      return await res.json();
    },
    updateProfile: async (profileData) => {
      const res = await fetch(`${API_BASE}/users/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      });
      if (!res.ok) throw new Error('Failed to update node details');
      return await res.json();
    },
    awardXp: async (xpAmount) => {
      const res = await fetch(`${API_BASE}/users/xp`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ xpAmount })
      });
      if (!res.ok) throw new Error('Failed to process XP rewards');
      return await res.json();
    },
    getLeaderboard: async () => {
      const res = await fetch(`${API_BASE}/users/leaderboard`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to download global ranks');
      return await res.json();
    }
  },

  // ANNOUNCEMENTS NOTICE SYSTEM
  announcements: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/announcements`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to retrieve notices');
      return await res.json();
    },
    create: async (title, content, type, authorId) => {
      const res = await fetch(`${API_BASE}/announcements`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title, content, type, authorId })
      });
      if (!res.ok) throw new Error('Failed to post announcement');
      return await res.json();
    }
  },

  // QUIZZES CONTROLLER
  quizzes: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/quizzes`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to read quizzes pool');
      return await res.json();
    },
    create: async (quizData) => {
      const res = await fetch(`${API_BASE}/quizzes`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(quizData)
      });
      if (!res.ok) throw new Error('Failed to build quiz model');
      return await res.json();
    }
  },

  // PLACEMENT OPPORTUNITIES
  opportunities: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/opportunities`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to download placements');
      return await res.json();
    },
    create: async (opportunityData) => {
      const res = await fetch(`${API_BASE}/opportunities`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(opportunityData)
      });
      if (!res.ok) throw new Error('Failed to register opportunity');
      return await res.json();
    }
  },

  // KNOWLEDGE ARTICLES / BLOGS
  articles: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/articles`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to retrieve articles list');
      return await res.json();
    },
    create: async (articleData) => {
      const res = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(articleData)
      });
      if (!res.ok) throw new Error('Failed to publish knowledge post');
      return await res.json();
    }
  },

  // REAL-TIME MESSAGING HISTORIES
  messages: {
    getByRoom: async (room) => {
      const res = await fetch(`${API_BASE}/messages/${room}`, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch chat log');
      return await res.json();
    },
    logMessage: async (messageData) => {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(messageData)
      });
      if (!res.ok) throw new Error('Failed to log message node');
      return await res.json();
    }
  }
};
