import propensityListData from "@/constants/propensityList.json";
import { IPropensityCardProps, IPropensityList } from "@/types/pblist";
import Link from "next/link";

function PropensityCard({ userPropensity }: IPropensityCardProps) {
  const propensityList = propensityListData as IPropensityList;
  const { lossRisk, pursuit, productRisk, bar, propensity } = propensityList[userPropensity];
  const dotPosition = `left-[${Math.floor((bar / 6) * 100)}%]`;
  const DOT_STYLE = `absolute top-1/2 -translate-x-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-[5px] bg-primary-normal ${dotPosition}`;
  return (
    <article className="mb-10 w-full rounded-lg bg-white px-4 py-4 shadow-md">
      <div className="mb-4 flex items-end justify-between border-b-1 border-dashed border-gray-normal pb-4">
        <h3 className="text-bold text-2xl text-primary-normal">{propensity}</h3>
        <Link className="text-xs text-gray-heavy underline decoration-1" href="/my/propensity">
          상세보기
        </Link>
      </div>
      <div className="py-3">
        <div className="relative mb-2 h-1 w-full bg-background-normal">
          <div className={`${DOT_STYLE}`} />
        </div>
        <p className="text-tiny">
          손실 위험도 : <span className="text-status-positive">{lossRisk}</span>
        </p>
      </div>
      <div className="py-3">
        <div>
          <div className="relative mb-2 h-1 w-full bg-background-normal">
            <div className={`${DOT_STYLE}`} />
          </div>
          <p className="text-tiny">
            수익 추구 : <span className="text-status-positive">{pursuit}</span>
          </p>
        </div>
      </div>
      <div className="py-3">
        <div>
          <div className="relative mb-2 h-1 w-full bg-background-normal">
            <div className={`${DOT_STYLE}`} />
          </div>
          <p className="text-tiny">
            상품 위험도 : <span className="text-status-positive">{productRisk}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default PropensityCard;
