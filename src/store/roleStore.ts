import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RoleState {
  user: {
    role: string;
    name: string;
  };
}

const RoleState = create<RoleState>(
  // @ts-ignore
  persist(
    () => ({
      user: {
        role: "USER",
        name: "홍길동",
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useRoleStore = () => RoleState(state => state);
