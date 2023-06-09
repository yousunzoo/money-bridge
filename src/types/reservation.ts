import { Dayjs } from "dayjs";

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
  moveToNextStep: () => void;
  pbStation?: IPbStation;
  handleOpenModal?: () => void;
}

export interface ICandidateTimes {
  candidateTime1: string | null;
  candidateTime2: string | null;
}
export interface ISelectTimeModalProps {
  handleCloseModal: () => void;
  consultTime: IConsultTime;
}
export interface ISelectCalendarProps {
  handleSelect: (e: Dayjs) => void;
}

export interface ITimeSelectProps {
  selectedDate: string;
  selectOptions: {
    am: string[];
    pm: string[];
  };
  handleTimeSelect: (time: string) => void;
}
