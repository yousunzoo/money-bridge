import { create } from "zustand";

interface IResultStore {
  result: boolean;
  setResult: (result: boolean) => void;
  getResult: () => boolean;
}

const resultStore = create<IResultStore>((set, get) => ({
  result: false,
  setResult: (result:boolean) => set({ result }),
  getResult: () => get().result,
}));

export const useResultStore = () => resultStore(state => state);
