import { create } from "zustand";

interface IAuthenticationStore {
  code: string;
  setCode: (code: string) => void;
  resetCode: () => void;
}

const initialState = "";
const authenticationStore = create<IAuthenticationStore>(set => ({
  code: initialState,
  setCode: data => set(() => ({ code: data })),
  resetCode: () => set({ code: initialState }),
}));

export const useAuthenticationStore = () => authenticationStore(state => state);
