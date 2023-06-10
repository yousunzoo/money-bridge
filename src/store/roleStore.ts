import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RoleState {
  role: string;
  setRole: (role: string) => void;
  getRole: () => string;
}
const isClient = typeof window !== "undefined"; 
const RoleState = create<RoleState>(
  // @ts-ignore
  persist(
    (set, get) => ({
      role: isClient ? localStorage.getItem("role") || "" : "",
      setRole: (role: string) => {
        if (isClient) {
          localStorage.setItem("role", JSON.stringify(role));
        }
        set({ role });
      },
      getRole: () => get().role,
    }),
    {
      name: "role",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useRoleStore = () => RoleState(state => state);
