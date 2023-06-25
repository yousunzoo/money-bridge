import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ButtonModalProps {
  modalContents: IModalContents;
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IModalContents {
  content: string;
  confirmText: string;
  cancelText?: string;
  confirmFn?: () => any;
  cancelFn?: () => any;
}
export interface ReviewCardProps {
  profileImage: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface ReviewCardItemProps extends ReviewCardProps {
  reviewId: number;
}

export interface IListResponse<T> {
  list: T[];
  totalElements?: number;
  totalPages?: number;
  curPage?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface IDataResponse<T> {
  data: T;
  totalElements?: number;
  totalPages?: number;
  curPage?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}