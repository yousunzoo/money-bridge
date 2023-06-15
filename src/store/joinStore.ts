import { IJoinStore } from "@/types/join";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = { email: "", password: "", name: "", phoneNumber: "", agreements: [] };
const joinStore = create(
  persist<IJoinStore>(
    set => ({
      informations: initialState,
      setInformations: (step, information) =>
        set(state => ({ informations: { ...state.informations, [step]: information } })),
      resetInformations: () => set({ informations: initialState }),
    }),
    { name: "joinUser", storage: createJSONStorage(() => sessionStorage) },
  ),
);

export const useJoinStore = () => joinStore(state => state);
