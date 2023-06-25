import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import CandidateTime from "../Modals/CandidateTime";
import editIcon from "/public/assets/images/editIcon.svg";
import Image from "next/image";
import { IAnswers } from "@/types/reservation";

export interface IUserBubbleProps {
  answerRef: MutableRefObject<HTMLDivElement | null>;
  step: 0 | 1 | 2 | 3 | 4 | 5;
  answers: IAnswers;
  setIsChoosable: Dispatch<SetStateAction<boolean>>;
}
function UserBubble({ answerRef, step, answers, setIsChoosable }: IUserBubbleProps) {
  const didAnswer = step === 3 && answers[3]?.candidateTime1 ? true : answers[step] ? true : false;
  const margin = answers[(step + 1) as 1 | 2 | 3 | 4 | 5] ? "" : "mt-10";
  return (
    <>
      {!didAnswer && <div className="grow" />}
      <div ref={answerRef} />
      <div className={`user_bubble flex gap-2 ${didAnswer && margin}`}>
        {step === 3 && answers[3] && <CandidateTime candidates={answers[3]} />}
        {step === 5 && answers[5] && <p>맞습니다</p>}
        {step !== 3 && step !== 5 && answers[step] && <p>{answers[step]}</p>}
      </div>
      <button onClick={() => setIsChoosable(true)} className="mt-2 flex items-center gap-2 self-end text-xs">
        <Image src={editIcon} width={20} height={20} alt="수정하기" />
        <span>수정하기</span>
      </button>
    </>
  );
}

export default UserBubble;
