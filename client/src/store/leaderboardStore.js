import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockLeaderboard } from '../mock/leaderboard';

export const useLeaderboardStore = create()(
  persist(
    (set, get) => ({
      leaderboard: mockLeaderboard,

      syncUserScore: (userName, userXP) => {
        const currentList = get().leaderboard;
        const exists = currentList.find((entry) => entry.name === userName);

        let updatedList = [];
        if (exists) {
          updatedList = currentList.map((entry) => 
            entry.name === userName ? { ...entry, xp: userXP } : entry
          );
        } else {
          updatedList = [
            ...currentList,
            { name: userName, xp: userXP, badges: ["Rookie"], role: "student" }
          ];
        }

        // Sort descending by XP and update ranks
        updatedList.sort((a, b) => b.xp - a.xp);
        const rankedList = updatedList.map((entry, index) => ({
          ...entry,
          rank: index + 1
        }));

        set({ leaderboard: rankedList });
      }
    }),
    {
      name: 'campusx-leaderboard-storage'
    }
  )
);
