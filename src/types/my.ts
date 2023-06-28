import { Dispatch, SetStateAction } from "react";
import { IPropensity, TSpeciality } from "./pblist";
import { IPbCard } from "@/types/card";

export interface IUserInfoProps {
  handleAuthorizationError: () => void;
}

export interface IUserStep {
  hasDonePropensity: boolean;
  hasDoneBoardBookmark: boolean;
  hasDoneReservation: boolean;
  hasDoneReview: boolean;
}

export type TProgress = "hasDonePropensity" | "hasDoneBoardBookmark" | "hasDoneReservation" | "hasDoneReview";

export interface IReservationCount {
  apply: number;
  confirm: number;
  complete: number;
}

export interface IBookmarkPreviewList {
  count: number;
  list: IBookmarkPreview[];
}

export interface IBookmarkPreview {
  id: number;
  thumbnail: string;
}

export interface IUserInfo {
  id: number;
  name: string;
  propensity: IPropensity | null;
  step: IUserStep;
  reservationCount: IReservationCount;
  boardBookmark: IBookmarkPreviewList;
  userBookmark: IBookmarkPreviewList;
}
export interface IUserEditableInfo {
  phoneNumber: string;
  name: string;
  email: string;
}

export interface IPBInfo {
  name: string;
  profile: string;
  branchName: string;
  msg: string;
  career: number;
  speciality1: TSpeciality;
  speciality2: TSpeciality;
  reserveCount: number;
  reviewCount: number;
}

export interface IStepProgressProps {
  step: IUserStep;
}

export interface IMyReservationStatusProps {
  reservationCount: IReservationCount;
}

export interface IBookmarkPreviewProps {
  boardBookmark: IBookmarkPreviewList;
  pbBookmark: IBookmarkPreviewList;
}

export interface IBookmarkPreviewCardProps {
  type: "board" | "pb";
  bookmark: IBookmarkPreviewList;
}

export interface IPropensityData {
  name: string;
  propensity: IPropensity;
  list: IPbCard[];
}

export interface IPropensityInfoCardProps {
  propensity: string;
  info: string[];
}

export interface IEditInfoFormProps {
  type: string;
  onSubmit: (data: { [key: string]: string }) => void;
}

export interface IAccordianItemProps {
  listItem: INoticeItem;
  nowClicked: string | null;
  setNowClicked: Dispatch<SetStateAction<string | null>>;
}

export interface IAccordianListProps {
  type: "faq" | "notice";
}
export interface INoticeItem {
  id: number;
  title: string;
  content: string;
  date?: string;
  label?: string;
}

export interface IEditProfileFormProps {
  existingProfile: IPBMyProfile;
}

export interface IPBMyProfile {
  company: string;
  companyId: number;
  branchName: string;
  career: number;
  careers: ICareer[];
  awards: IAward[];
  speciality1: string;
  speciality2: string;
  cumulativeReturn: number;
  maxDrawdown: number;
  profitFactor: number;
  averageProfit: number;
  profile: string | FileList;
  portfolio: string | FileList;
  intro: string;
  msg: string;
}

export interface ICareer {
  id?: number;
  career: string | undefined;
  start: number | undefined;
  end: number | undefined;
}
export interface IAward {
  id?: string;
  record: string | undefined;
  year: number | undefined;
}
