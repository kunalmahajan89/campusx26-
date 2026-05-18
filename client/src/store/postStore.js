import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockPosts } from '../mock/posts';
import { api, checkServerHealth } from '../api';
import { toast } from 'sonner';

export const usePostStore = create()(
  persist(
    (set, get) => ({
      posts: mockPosts,
      loading: false,

      // DYNAMIC LOAD TIMELINE FROM MONGODB OR LOCAL MOCK
      fetchPosts: async () => {
        set({ loading: true });
        try {
          const isOnline = await checkServerHealth();
          if (isOnline) {
            const data = await api.articles.getAll();
            
            // Map Mongoose MongoDB articles to frontend layout format
            const mapped = data.map((art) => ({
              id: art._id,
              userId: art.author?._id || 'unknown',
              userName: art.author?.name || 'Anonymous Coder',
              userRole: art.author?.role || 'student',
              userAvatar: art.author?.avatar || 'A',
              content: art.content,
              title: art.title,
              tags: art.tags || [],
              likes: art.likes?.length || 0,
              likedBy: art.likes || [],
              comments: art.comments || [],
              timestamp: new Date(art.createdAt).toLocaleDateString()
            }));

            set({ posts: mapped, loading: false });
          } else {
            set({ posts: mockPosts, loading: false });
          }
        } catch (err) {
          console.error("Posts fetch database error, using mock data:", err);
          set({ posts: mockPosts, loading: false });
        }
      },

      addPost: async (content, currentUser) => {
        if (!currentUser) return;
        
        try {
          const isOnline = await checkServerHealth();
          
          if (isOnline) {
            toast.loading("Broadcasting discuss node...", { id: "post" });
            const data = await api.articles.create({
              title: "Discuss Node",
              content,
              tags: ["Tech", "Engineering"]
            });

            const newPost = {
              id: data._id,
              userId: currentUser.id,
              userName: currentUser.name,
              userRole: currentUser.role,
              userAvatar: currentUser.avatar,
              content: data.content,
              likes: 0,
              likedBy: [],
              comments: [],
              timestamp: "Just now"
            };

            set((state) => ({
              posts: [newPost, ...state.posts]
            }));
            toast.success("Broadcast successfully synced to blockchain! 🚀", { id: "post" });
          } else {
            const newPost = {
              id: `p_${Date.now()}`,
              userId: currentUser.id,
              userName: currentUser.name,
              userRole: currentUser.role,
              userAvatar: currentUser.avatar,
              content,
              likes: 0,
              comments: [],
              timestamp: "Just now",
              likedBy: []
            };

            set((state) => ({
              posts: [newPost, ...state.posts]
            }));
            toast.success("Discuss node instance broadcasted locally (Offline mode) 🔗");
          }
        } catch (err) {
          console.error("Failed to add post:", err);
          toast.error("Failed to post: database connection error");
        }
      },

      likePost: (postId, userId) => {
        // Toggle liking state
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              const isLiked = post.likedBy?.includes(userId);
              const likedBy = isLiked
                ? post.likedBy.filter((id) => id !== userId)
                : [...(post.likedBy || []), userId];
              
              return {
                ...post,
                likedBy,
                likes: isLiked ? post.likes - 1 : post.likes + 1
              };
            }
            return post;
          })
        }));
        toast.success("Vote securely recorded! 🗳️");
      },

      addComment: (postId, commentContent, userName) => {
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              const newComment = {
                id: `c_${Date.now()}`,
                userName,
                content: commentContent,
                timestamp: "Just now"
              };
              return {
                ...post,
                comments: [...post.comments, newComment]
              };
            }
            return post;
          })
        }));
        toast.success("Comment appended cleanly! 📝");
      }
    }),
    {
      name: 'campusx-post-storage'
    }
  )
);
