import { Dispatch, SetStateAction } from "react";

export interface ButtonModalProps {
  modalContents: {
    content: string;
    confirmText: string;
    cancelText?: string;
    confirmFn?: () => any;
    cancelFn?: () => any;
  };
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export interface ReviewCardProps {
  profileImage: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface RevieCardItemProps extends ReviewCardProps {
  reviewId: number;
}
