import { ReactNode } from "react";

export interface IProfile {
  profile: string;
  msg: string;
  companyLogo: string;
}
export interface IloginProfile {
  id: number;
  profile: string;
  msg: string;
  name: string;
  isBookmarked: boolean;
  companyId: number;
  companyName: string;
  companyLogo: string;
  branchName: string;
  branchAddress: string;
  branchLatitude: number;
  branchLongitude: number;
  reserveCount: number;
  reviewCount: number;
  intro: string;
  speciality1: string;
  speciality2: string;
  career: ICareer[];
  award: IAward[];
}

export interface IIntroData {
  id: number;
  profile: string;
  name: string;
  isBookmarked: boolean;
  branchName: string;
  msg: string;
  companyId: number;
  companyName: string;
  companyLogo: string;
  reserveCount: number;
  reviewCount: number;
}

export interface IContentData {
  id: number;
  intro: string;
  name: string;
  speciality1: string;
  speciality2: string;
  career: ICareer[];
  award: IAward[];
}

export interface IAboutData {
  name: string;
  id: number;
  branchAddress: string;
  branchName: string;
  companyName: string;
  branchLatitude: number;
  branchLongitude: number;
}

export interface ICareer {
  id: number;
  start: number;
  end: number;
  career: string;
}

export interface IAward {
  id: number;
  year: number;
  record: string;
}

export interface IPortfolio {
  cumulativeReturn: number;
  maxDrawdown: number;
  profitFactor: number;
  averageProfit: number;
  file: string;
  name: string;
}

export interface IPortfolioUpdate {
  company: string;
  branchName: string;
  career: number;
  careers: {
    content: string;
    start: number;
    end: number;
  }[];
  awards: {
    record: string;
    year: number;
  }[];
  speciality1: string;
  speciality2: string;
  cumulativeReturn: number;
  maxDrawdown: number;
  profitFactor: number;
  averageProfit: number;
  file: string;
  intro: string;
  msg: string;
}

export interface IPbReview {
  reviewId: number;
  userName: string;
  content: string;
  createdAt: string;
  list: {
    style: string;
  }[];
}

export interface IReviewStyles {
  style1: string;
  style2: string;
  style3: string;
}

export interface UserReservationItemProps {
  children: ReactNode;
  buttonName: string;
  href?: string;
  isRole: string;
  profileImage: string;
  disabled?: boolean;
}

export interface ReservationData {
  pbId: number;
  profileImage: string;
  name: string;
  phoneNumber: string;
  reservationId: number;
  candidateTime1: string;
  candidateTime2: string;
  time: string;
  location: string;
  locationAddress: string;
  goal: string;
  question: string;
  type: string;
  consultEnd: string;
  consultStart: string;
  email: string;
  notice: string;
  reviewCheck: boolean;
  userId: number;
}

export interface ConsultationListProps {
  type: string;
  page: number;
}
export interface GetScheduleInfoProps {
  year?: number;
  month?: number;
}
export interface ChangeReservationProps {
  id: number;
  category: string | null;
  time: string;
  type: string;
}
