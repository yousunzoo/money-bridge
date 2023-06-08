import { IQuestion } from "@/types/reservation";
import React from "react";

interface IBubbleSectionProps {
  questions: IQuestion;
  moveToNextStep: () => void;
}
function BubbleSection({ questions, moveToNextStep }: IBubbleSectionProps) {
  const { question, intro1, intro2, intro3, sub, options } = questions;

  return (
    <section className="mb-4 flex flex-col gap-y-4">
      {intro1 && (
        <div className="chatBubble">
          <p>{intro1}</p>
        </div>
      )}
      {intro2 && (
        <div className="chatBubble">
          <p>{intro2}</p>
        </div>
      )}
      {intro3 && (
        <div className="chatBubble">
          <p>{intro3}</p>
        </div>
      )}
      <div className="chatBubble !w-full">
        <div className="mb-4">
          <p className="text-lg font-semibold">{question}</p>
          {sub && <p>{sub}</p>}
        </div>
        <div className="flex flex-col  gap-3">
          {options.map((option, idx) => (
            <button
              onClick={moveToNextStep}
              className="w-fit rounded-2xl border-2 border-black bg-white px-2 py-1"
              key={idx}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BubbleSection;
