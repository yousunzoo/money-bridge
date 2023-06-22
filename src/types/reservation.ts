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

export interface IUserInfo {
  userName: string;
  userPhoneNumber: string;
  userEmail: string;
}

export interface IReservationPageData {
  consultInfo: IConsultInfo;
  pbInfo: IPBInfo;
  userInfo: IUserInfo;
}
export interface IBubbleSectionProps {
  step: 0 | 1 | 2 | 3 | 4 | 5;
  isOpen?: Boolean;
  moveToNextStep: (nowStep: number) => void;
  skipNextStep?: () => void;
  pbStation?: IPbStation;
  consultTime?: IConsultInfo;
  handleOpenModal?: (nowStep: number) => void;
  userInfo?: IUserInfo;
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

export type IUseGetReservationPageDataProps = () => { reservationData: IReservationPageData; loading: boolean };
