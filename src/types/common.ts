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

export interface IBubbleSectionProps {
  step: number;
  answers: {
    0: string[] | null;
    1: string | null;
    2: string | null;
    3: string | null;
    4: string | null;
    5: string | null;
  };
  setAnswers: Dispatch<
    SetStateAction<{
      0: string[] | null;
      1: string | null;
      2: string | null;
      3: string | null;
      4: string | null;
      5: string | null;
    }>
  >;
  moveToNextStep: () => void;
}
