import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RoleState {
  user: {
    role: string;
    name: string;
  };
  User: () => void;
}
const isClient = typeof window !== "undefined";

const RoleState = create<RoleState>(
  // @ts-ignore
  persist(
    (set, get) => ({
      user: {
        role: "USER",
        name: "홍길동",
      },

      User: () => {
        if (isClient) {
          set({ user: { role: get().user.role, name: get().user.name } });
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useRoleStore = () => RoleState(state => state);
