import { Dispatch, ReactNode, SetStateAction } from "react";
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
export interface IReservationChatProps {
  reservationData: IReservationData;
  pbId: number;
}
export interface IAnswers {
  0: string | null;
  1: string | null;
  2: string | null;
  3: ICandidateTimes | null;
  4: string | null;
  5: IUserInfo | null;
}

export interface IPbStation {
  branchName: string;
  branchAddress: string;
  branchLatitude: number;
  branchLongitude: number;
}
export interface IPBInfo extends IPbStation {
  pbName: string;
}

export interface IConsultInfo {
  consultEnd: string;
  consultStart: string;
  notice: string;
}
export interface ILoginedUserInfo {
  id: number;
  name: string;
  role: string;
  propensity: string | null;
}
export interface IUserInfo {
  userName: string;
  userPhoneNumber: string;
  userEmail: string;
}

export interface IReservationData {
  consultInfo: IConsultInfo;
  pbInfo: IPBInfo;
  userInfo: IUserInfo;
}
export interface IPurposeQuestionProps {
  moveToNextStep: (nowStep: number) => void;
}

export interface ITypeQuestionProps {
  moveToNextStep: (nowStep: number) => void;
  skipNextStep: () => void;
}

export interface ITimeSelectQuestionProps {
  consultTime: IConsultInfo;
  handleOpenModal: (nowStep: number) => void;
  isOpen: boolean;
}

export interface ILocationQuestionProps {
  moveToNextStep: (nowStep: number) => void;
  pbStation: IPbStation;
}

export interface ICheckQuestionProps {
  moveToNextStep: (nowStep: number) => void;
  handleOpenModal: (nowStep: number) => void;
  userInfo: IUserInfo;
  isOpen: boolean;
}

export interface ICheckMemoQuestion {
  isOpen: boolean;
  moveToNextStep: (nowStep: number) => void;
  handleOpenModal: (nowStep: number) => void;
}

export interface ICandidateTimes {
  candidateTime1: string | null;
  candidateTime2: string | null;
}
export interface IEditProfileModalProps {
  nowStep: number;
  handleCloseModal: () => void;
  moveToNextStep: (nowStep: number) => void;
  userInfo: IUserInfo;
}
export interface ICandidateTimeProps {
  candidates: ICandidateTimes;
}
export interface ISelectTimeModalProps {
  nowStep: number;
  handleCloseModal: () => void;
  moveToNextStep: (nowStep: number) => void;
  consultTime: IConsultInfo;
}
export interface ISelectCalendarProps {
  handleSelect: (e: Dayjs) => void;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
}

export interface ITimeSelectProps {
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  selectedDate: string;
  selectOptions: {
    am: string[];
    pm: string[];
  };
  handleTimeSelect: (time: string) => void;
}

export interface IForwardingModalProps {
  nowStep: number;
  moveToNextStep: (nowStep: number) => void;
  handleCloseModal: () => void;
}

export interface IModalLayoutProps {
  children: ReactNode;
  handleCloseModal: () => void;
}

export type IUseGetReservationPageDataProps = () => { reservationData: IReservationData; loading: boolean };
