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
  multi: boolean;
}
