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

export interface IAnswers {
  0: string[] | null;
  1: string | null;
  2: string | null;
  3: string | null;
  4: string | null;
  5: string | null;
}
export interface IBubbleSectionProps {
  step: 0 | 1 | 2 | 3 | 4 | 5;
  answers: IAnswers;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  moveToNextStep: () => void;
  pbStation?: {
    branchName: string;
    branchAddress: string;
    branchLatitude: number;
    branchLongitude: number;
  };
  consultTime?: {
    consultEnd: string;
    consultStart: string;
    notice: string;
  };
}
