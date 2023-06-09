import { Dispatch, SetStateAction } from "react";

export interface IQuestions {
  [key: number]: IQuestion;
}

export interface IQuestion {
  question: string;
  sub?: string;
  intro1?: string;
  intro2?: string;
  intro3?: string;
  options: string[];
}

export interface IAnswers {
  0: string[] | null;
  1: string | null;
  2: string | null;
  3: string | null;
  4: string | null;
  5: string | null;
}

export interface IPbStation {
  branchName: string;
  branchAddress: string;
  branchLatitude: number;
  branchLongitude: number;
}
export interface IConsultTime {
  consultEnd: string;
  consultStart: string;
  notice: string;
}
export interface IBubbleSectionProps {
  step: 0 | 1 | 2 | 3 | 4 | 5;
  answers: IAnswers;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  moveToNextStep: () => void;
  pbStation?: IPbStation;
  consultTime?: IConsultTime;
}
