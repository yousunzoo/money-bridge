import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoleState {
  role: string;
  setRole: (role: string) => void;
  getRole: () => string;
}
const RoleState = create<RoleState>(
  // @ts-ignore
  (persist as IUsePersistStore)((set, get) => ({
    role: localStorage.getItem("role") || "",
    setRole: (role: string) => {
      localStorage.setItem("role", role);
      set({ role });
    },
    getRole: () => get().role,
  })),
);

export const useRoleStore = () => RoleState(state => state);
