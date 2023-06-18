import { riskRating } from "@/constants/propensityList";

function RiskGrades({ grade }: { grade: string }) {
  riskRating;
  return (
    <section className="mb-10 w-full rounded-lg bg-white p-4 shadow-md">
      <h3 className="mb-4 border-b-1 border-dashed border-background-normal pb-4 text-2xl font-bold text-primary-normal">
        투자성향별 위험도
      </h3>
      <div className="gray-heavy mb-3 flex justify-between text-sm">
        <span>위험도 등급</span>
        <span>수익률 변동성</span>
      </div>
      <ul>
        {riskRating.map(ratingItem => (
          <li
            key={ratingItem.grade}
            className={`mb-3 flex h-12 w-full items-center rounded-[8px] px-4 text-sm text-gray-heavy shadow-md ${
              ratingItem.grade === grade ? "bg-primary-light font-bold text-white" : "bg-background-normal"
            }`}
          >
            <span className="w-[50px]">Lv.{ratingItem.grade}</span>
            <span>{ratingItem.info}</span>
            <span className="ml-auto">{ratingItem.volatility}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RiskGrades;
