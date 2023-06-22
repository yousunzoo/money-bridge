export interface IAnalysisQuestions {
  [key: number]: IQuestion;
}

export interface IQuestion {
  intro1?: string[];
  intro2?: string;
  question: string;
  options: string[];
}

export interface IQuestionSectionProps {
  nowStep: number;
  nowQuestion: IQuestion;
  moveToNextStep: (nowStep: number, answer: string) => void;
}

export interface IAnalysisAnswers {
  0: string | null;
  1: string | null;
  2: string | null;
  3: string | null;
  4: string | null;
  5: string | null;
}
