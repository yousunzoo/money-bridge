import { IAnalysisAnswers } from "@/types/analysis";
import { create } from "zustand";

interface IAnalysisStore {
  answers: IAnalysisAnswers;
  setAnswers: (step: number, answer: string) => void;
  resetAnswers: () => void;
}

const initialState = { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null };
const analysisStore = create<IAnalysisStore>(set => ({
  answers: initialState,
  setAnswers: (step, answer) => set(state => ({ answers: { ...state.answers, [step]: answer } })),
  resetAnswers: () => set({ answers: initialState }),
}));

export const useAnalysisStore = () => analysisStore(state => state);
