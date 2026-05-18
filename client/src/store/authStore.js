import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../mock/users';
import { api, checkServerHealth } from '../api';
import { toast } from 'sonner';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      users: mockUsers,
      error: null,
      isServerOnline: false,

      // CHECK AND CACHE CURRENT SERVER STATE
      probeServer: async () => {
        const isOnline = await checkServerHealth();
        set({ isServerOnline: isOnline });
        return isOnline;
      },

      login: async (email, password) => {
        try {
          const isOnline = await get().probeServer();
          
          if (isOnline) {
            toast.loading("Establishing secure connection node...", { id: "auth" });
            const data = await api.auth.login(email, password);
            
            // Store token for Bearer headers
            localStorage.setItem('campusx_token', data.token);

            const userObj = {
              id: data._id,
              name: data.name,
              email: data.email,
              role: data.role,
              avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
              college: data.college || "CAMPUSX Institute of Tech",
              branch: data.branch || "Computer Science Department",
              github: data.github || "github.com/kunalmahajan89",
              xp: data.points || 120,
              rank: 5,
              badges: ["Rookie", "Alpha Coder"],
              streak: 3
            };

            set({ user: userObj, error: null });
            toast.success("Connection securely handshake instantiated! ⚡", { id: "auth" });
            return true;
          } else {
            // Offline fallbacks
            const foundUser = get().users.find((u) => u.email === email);
            if (foundUser) {
              set({ user: foundUser, error: null });
              toast.success("Handshake active: Mock Node instanced (Server offline) 🔗");
              return true;
            }
            set({ error: "Invalid email or credentials" });
            toast.error("Handshake fail: Invalid mock credential key", { id: "auth" });
            return false;
          }
        } catch (err) {
          set({ error: err.message });
          toast.error(`Handshake fail: ${err.message}`, { id: "auth" });
          return false;
        }
      },

      signup: async (name, email, role, branch, github) => {
        try {
          const isOnline = await get().probeServer();

          if (isOnline) {
            toast.loading("Instantiating user profile in registry...", { id: "auth" });
            const data = await api.auth.register({ name, email, password: "password123", role });
            localStorage.setItem('campusx_token', data.token);

            const userObj = {
              id: data._id,
              name: data.name,
              email: data.email,
              role: data.role,
              avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
              college: "CAMPUSX Institute of Tech",
              branch: branch || "Computer Science Department",
              github: github || "github.com/kunalmahajan89",
              xp: 100,
              rank: 10,
              badges: ["Rookie"],
              streak: 1
            };

            set({ user: userObj, error: null });
            toast.success("User node registered successfully! 🔑", { id: "auth" });
            return true;
          } else {
            const newUser = {
              id: `u_${Date.now()}`,
              name,
              email,
              role,
              branch: branch || "General Engineering",
              college: "Tier-3 Institute of Technology",
              github: github || "github.com",
              avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
              xp: 100,
              rank: get().users.length + 1,
              badges: ["Rookie"],
              streak: 1
            };

            set((state) => ({
              users: [...state.users, newUser],
              user: newUser,
              error: null
            }));
            toast.success("Mock user registered locally (Server offline) 🔗");
            return true;
          }
        } catch (err) {
          set({ error: err.message });
          toast.error(`Registration node error: ${err.message}`, { id: "auth" });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('campusx_token');
        set({ user: null, error: null });
        toast.info("Session link cleanly terminated");
      },

      addXP: async (amount) => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          const isOnline = await get().probeServer();
          
          if (isOnline) {
            const data = await api.users.awardXp(amount);
            const updated = {
              ...currentUser,
              xp: data.points,
              badges: data.badges,
              streak: data.streak
            };
            set({ user: updated });
          } else {
            // Offline mock state update
            const updated = {
              ...currentUser,
              xp: currentUser.xp + amount
            };
            set({ user: updated });
          }
        } catch (err) {
          console.error("XP allocation state update error:", err);
        }
      }
    }),
    {
      name: 'campusx-auth-storage'
    }
  )
);
