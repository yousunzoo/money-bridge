import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RoleState {
  role: string;
  name: string;
  setUser: (role: string, name: string) => void;
  getUser: () => { role: string; name: string };
}
const isClient = typeof window !== "undefined";
const RoleState = create<RoleState>(
  // @ts-ignore
  persist(
    (set) => ({
      role: "",
      name: "",
      setUser: (role: string, name: string) => {
        if (isClient) {
          localStorage.setItem("user", JSON.stringify({ role, name }));
        }
        set({ role, name });
      },
      getUser: () => {
        if (isClient) {
          const userData = localStorage.getItem("user");
          if (userData !== null) {
            const { role, name } = JSON.parse(userData).state;
            return { role, name };
          }
        }
          return { role: "", name: "" };      
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useRoleStore = () => RoleState(state => state);
