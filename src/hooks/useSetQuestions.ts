import { useReservationStore } from "@/store/reservationStore";
import { useEffect, useRef, useState } from "react";
import reservationQuestions from "@/constants/reservationQuestions.json";
import { IQuestions } from "@/types/reservation";

export const useSetQuestions = (step: 0 | 1 | 2 | 3 | 4 | 5, isOpen?: boolean) => {
  const nowQuestion = (reservationQuestions as IQuestions)[step];
  const [isChoosable, setIsChoosable] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const answerRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswers } = useReservationStore();

  useEffect(() => {
    if (!sectionRef.current || !answerRef.current) return;

    if (!isChoosable) {
      sectionRef.current.classList.remove("h-screen");
      answerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
    if (step !== 0 && isChoosable) {
      sectionRef.current.classList.add("h-screen");
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
  }, [isChoosable]);

  useEffect(() => {
    if (answers[step] && !isOpen) {
      setIsChoosable(false);
    }
  }, [isOpen]);
  return { nowQuestion, isChoosable, setIsChoosable, sectionRef, answerRef, answers, setAnswers };
};
