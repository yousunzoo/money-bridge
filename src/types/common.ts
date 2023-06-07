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
