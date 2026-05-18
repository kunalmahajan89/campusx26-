import { create } from 'zustand';

export const useUiStore = create()((set) => ({
  sidebarOpen: true,
  postModalOpen: false,
  activeQuizTimer: 0,
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  setPostModalOpen: (isOpen) => set({ postModalOpen: isOpen })
}));
