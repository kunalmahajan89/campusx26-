export const mockPosts = [
  {
    id: "p1",
    userId: "u3",
    userName: "Neha Gupta",
    userRole: "senior",
    userCompany: "Google India",
    userAvatar: "NG",
    content: "Just finalized my referral list for the upcoming Google SWE Intern roles! High emphasis on DSA fundamentals and clear system design thought process for tier-3 grads. Drop your portfolio below, reviewing tonight. 🚀",
    likes: 84,
    comments: [
      {
        id: "c1",
        userName: "Kunal Mahajan",
        content: "Here is my portfolio: https://kunalmahajan89.github.io/portfolio. Focus on MERN, optimized with custom state stores. Would love a review! 🙌",
        timestamp: "2 hours ago"
      }
    ],
    timestamp: "4 hours ago",
    likedBy: []
  },
  {
    id: "p2",
    userId: "u2",
    userName: "Dr. Rajesh Sharma",
    userRole: "teacher",
    content: "Excellent performance in today's Operating Systems lab quiz. Special shoutout to Kunal for optimizing the deadlock prevention simulation using a state matrix. Keep up the high-grade research!",
    likes: 42,
    comments: [],
    timestamp: "1 day ago",
    likedBy: []
  },
  {
    id: "p3",
    userId: "u1",
    userName: "Kunal Mahajan",
    userRole: "student",
    content: "Finally cracked the Zustand local storage persistence bug for our new dashboard! Clean state, zero Redux boilerplate. Check out the clean SaaS UX details in the screenshot. 👇",
    likes: 19,
    comments: [],
    timestamp: "2 days ago",
    likedBy: []
  }
];
