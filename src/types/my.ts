import { IPropensity, TSpeciality } from "./pblist";

export interface IUserStep {
  hasDonePropensity: boolean;
  hasDoneBoardBookMark: boolean;
  hasDoneReservation: boolean;
  hasDoneReview: boolean;
}

export type TProgress = "hasDonePropensity" | "hasDoneBoardBookMark" | "hasDoneReservation" | "hasDoneReview";

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

export interface IUserInfoProps {
  data: IUserInfo;
}
export interface IPBInfoprops {
  data: IPBInfo;
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
  userBookmark: IBookmarkPreviewList;
}

export interface IBookmarkPreviewCardProps {
  type: "board" | "user";
  bookmark: IBookmarkPreviewList;
}

export interface IPropensityData {
  name: string;
  propensity: IPropensity;
  list: IPBCard[];
}

export interface IPBCard {
  id: number;
  profile: string;
  name: string;
  branchName: string;
  msg: string;
  career: number;
  specialty1: IPropensity;
  specialty2: IPropensity;
  reserveCount: number;
  reviewCount: number;
  isBookmark: boolean;
}

export interface IPropensityInfoCardProps {
  propensity: string;
  info: string[];
}

export interface IEditInfoFormProps {
  type: string;
  onSubmit: (data: { [key: string]: string }) => void;
}
