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

export type TAnswers = {
  0: string[] | null;
  1: string | null;
  2: string | null;
  3: string | null;
  4: string | null;
  5: string | null;
};

export type TsetAnswers = Dispatch<SetStateAction<TAnswers>>;
export interface IBubbleSectionProps {
  step: 0 | 1 | 2 | 3 | 4 | 5;
  answers: TAnswers;
  setAnswers: TsetAnswers;
  moveToNextStep: () => void;
}
