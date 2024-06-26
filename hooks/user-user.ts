import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface UserStore {
  user?: UserType | null;
  setUser: (user: UserType) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
