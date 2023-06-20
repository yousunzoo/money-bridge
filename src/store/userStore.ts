import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RoleState {
  user: {
    role: string;
    name: string;
  };
  setUser: (role: string, name: string) => void;
  resetUser: () => void;
}
const initialState = { role: "", name: "" };
const userStore = create(
  persist<RoleState>(
    set => ({
      user: initialState,
      setUser: (role, name) => set(state => ({ ...state, user: { role, name } })),
      resetUser: () => set({ user: initialState }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useUserStore = () => userStore(state => state);
