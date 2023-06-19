import React from "react";
interface ConsultationNoteSectionProps {
  role: string;
  goal: string;
  question: string;
}
function ConsultationNoteSection({ role, goal, question }: ConsultationNoteSectionProps) {
  return (
    <section>
      <div className="flex justify-between">
        <span className="font-bold">상담목적</span>
        <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>{goal}</span>
      </div>
      <div className="flex flex-col">
        <span className="mt-2 font-bold">요청사항</span>
        <p className="p-4 mt-2 rounded-sm bg-background-secondary">{question}</p>
      </div>
    </section>
  );
}

export default ConsultationNoteSection;
