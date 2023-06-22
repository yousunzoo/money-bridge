import React from "react";
import CandidateTime from "../CandidateTime";
import editIcon from "/public/assets/images/editIcon.svg";
import Image from "next/image";

function UserBubble({ step, answers, setIsChoosable }) {
  return (
    <>
      <div className="user_bubble flex gap-2">
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
