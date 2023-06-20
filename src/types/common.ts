import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ButtonModalProps {
  modalContents: {
    content: string;
    confirmText: string;
    cancelText?: string;
    confirmFn?: () => any;
    cancelFn?: () => any;
  };
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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

export interface User {
  role: string;
  name: string;
}

export interface ListResponse<T> {
  status: string;
  msg: string;
  data: {
    list: T[];
    totalElements?: number;
    totalPages?: number;
    curPage?: number;
    first?: boolean;
    last?: boolean;
    empty?: boolean;
  };
}

export interface DataResponse<T> {
  status: string;
  msg: string;
  data: T[] | null;
  totalElements?: number;
  totalPages?: number;
  curPage?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}
