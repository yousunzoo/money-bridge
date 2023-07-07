import { create } from "zustand";

interface IFindPasswordStore {
  data: IFindPasswordData;
  setData: (data: IFindPasswordData) => void;
  resetData: () => void;
}

interface IFindPasswordData {
  id: number;
  role: string;
  name: string;
  phoneNumber: string;
  email: string;
}

const initialState = { id: 0, role: "", name: "", phoneNumber: "", email: "" };
const findPasswordStore = create<IFindPasswordStore>(set => ({
  data: initialState,
  setData: data => set(() => ({ data: data })),
  resetData: () => set({ data: initialState }),
}));

export const useFindPasswordStore = () => findPasswordStore(state => state);
