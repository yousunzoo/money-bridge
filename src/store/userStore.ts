import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RoleState {
  user: {
    role: string;
    name: string;
    id: number | null;
  };
  setUser: (role: string, name: string, id: number) => void;
  resetUser: () => void;
}
const initialState = { role: "", name: "", id: null };
const userStore = create(
  persist<RoleState>(
    set => ({
      user: initialState,
      setUser: (role, name, id) => set(state => ({ ...state, user: { role, name, id } })),
      resetUser: () => set({ user: initialState }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useUserStore = () => userStore(state => state);
