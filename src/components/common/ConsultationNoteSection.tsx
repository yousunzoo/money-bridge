interface ConsultationNoteSectionProps {
  role: string;
  goal: string;
  question: string;
}

const RESERVATION_GOAL: { [key: string]: string } = {
  PROFIT: "투자 수익 창출",
  RISK: "리스크 관리",
  TAX: "세금 최적화",
  PRESERVATION: "재산 유지와 성장",
};

function ConsultationNoteSection({ role, goal, question }: ConsultationNoteSectionProps) {
  return (
    <section>
      <div className="flex justify-between">
        <span className="font-bold">상담목적</span>
        <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>
          {RESERVATION_GOAL[goal]}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="mt-2 font-bold">요청사항</span>
        <p className="mt-2 rounded-sm bg-background-secondary p-4">{question}</p>
      </div>
    </section>
  );
}

export default ConsultationNoteSection;
