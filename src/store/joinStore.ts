import { IJoinStore } from "@/types/join";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  email: "",
  password: "",
  name: "",
  phoneNumber: "",
  agreements: [],
  branchId: 0,
  career: 0,
  speciality1: "",
  speciality2: "",
  businessCard: null,
};
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
