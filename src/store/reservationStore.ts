import { IAnswers } from "@/types/reservation";
import { create } from "zustand";

interface IReservationStore {
  answers: IAnswers;
  setAnswers: (step: number, answer: string | string[] | {}) => void;
  resetAnswers: () => void;
}

const initialState = { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null };
const reservationStore = create<IReservationStore>(set => ({
  answers: initialState,
  setAnswers: (step, answer) => set(state => ({ answers: { ...state.answers, [step]: answer } })),
  resetAnswers: () => set({ answers: initialState }),
}));

export const useReservationStore = () => reservationStore(state => state);
