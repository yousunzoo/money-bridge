import { Dayjs } from "dayjs";

export interface IQuestions {
  [key: number]: IQuestion;
}

export interface IQuestion {
  question: string;
  intro1?: string;
  intro2?: string;
  options: string[];
}

export interface IAnswers {
  0: string[] | null;
  1: string | null;
  2: string | null;
  3: { candidateTime1: string; candidateTime2: string } | null;
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

export interface IUserInfo {
  userName: string;
  userPhoneNumber: string;
  userEmail: string;
}
export interface IBubbleSectionProps {
  step: 0 | 1 | 2 | 3 | 4 | 5;
  isOpen?: Boolean;
  moveToNextStep: () => void;
  pbStation?: IPbStation;
  consultTime?: IConsultTime;
  handleOpenModal?: () => void;
  userInfo?: IUserInfo;
}

export interface ICandidateTimes {
  candidateTime1: string | null;
  candidateTime2: string | null;
}
export interface IEditProfileModalProps {
  handleCloseModal: () => void;
  moveToNextStep: () => void;
  userInfo: IUserInfo;
}
export interface ICandidateTimeProps {
  candidates: ICandidateTimes;
}
export interface ISelectTimeModalProps {
  handleCloseModal: () => void;
  moveToNextStep: () => void;
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

export interface IForwardingModalProps {
  moveToNextStep: () => void;
  handleCloseModal: () => void;
}
