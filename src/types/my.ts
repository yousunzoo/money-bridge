import { IPropensity } from "./pblist";

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

export interface IUserInfo {
  id: number;
  name: string;
  propensity: IPropensity | null;
  step: IUserStep;
  reservationCount: IReservationCount;
  boardBookmark: IBookmarkPreviewList;
  userBookmark: IBookmarkPreviewList;
}

export interface IStepProgressProps {
  step: IUserStep;
}
