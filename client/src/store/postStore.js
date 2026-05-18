import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockPosts } from '../mock/posts';

export const usePostStore = create()(
  persist(
    (set, get) => ({
      posts: mockPosts,

      addPost: (content, currentUser) => {
        if (!currentUser) return;
        const newPost = {
          id: `p_${Date.now()}`,
          userId: currentUser.id,
          userName: currentUser.name,
          userRole: currentUser.role,
          userAvatar: currentUser.avatar,
          userCompany: currentUser.company || null,
          content,
          likes: 0,
          comments: [],
          timestamp: "Just now",
          likedBy: []
        };

        set((state) => ({
          posts: [newPost, ...state.posts]
        }));
      },

      likePost: (postId, userId) => {
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
      }
    }),
    {
      name: 'campusx-post-storage'
    }
  )
);
