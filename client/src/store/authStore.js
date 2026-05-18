import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../mock/users';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      users: mockUsers,
      error: null,

      login: (email, password) => {
        // Simple mock matching
        const foundUser = get().users.find((u) => u.email === email);
        if (foundUser) {
          set({ user: foundUser, error: null });
          return true;
        }
        set({ error: "Invalid email or credentials" });
        return false;
      },

      signup: (name, email, role, branch) => {
        const newUser = {
          id: `u_${Date.now()}`,
          name,
          email,
          role,
          branch: branch || "General Engineering",
          college: "Tier-3 Institute of Technology",
          avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
          xp: 0,
          rank: get().users.length + 1,
          badges: ["Rookie"],
          streak: 1
        };

        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          error: null
        }));
        return true;
      },

      logout: () => set({ user: null, error: null }),

      addXP: (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser = {
          ...currentUser,
          xp: currentUser.xp + amount
        };

        // Update in global list as well
        const updatedUsers = get().users.map((u) => 
          u.id === currentUser.id ? updatedUser : u
        );

        set({
          user: updatedUser,
          users: updatedUsers
        });
      }
    }),
    {
      name: 'campusx-auth-storage'
    }
  )
);
