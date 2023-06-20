import PbCardList from "@/components/common/Card/CardList/PbCardList";
import PropensityCard from "@/components/pblistPage/PropensityCard";
import pblistData from "@/mocks/seon/userPblist.json";
function RecommendPage() {
  const propensity = "CAUTIOUS";

  return (
    <div>
      <h3 className="mb-8 text-2xl font-bold">홍길동님의 투자성향은</h3>
      <PropensityCard userPropensity={propensity} />
      <section>
        <h3 className="mb-2 text-2xl font-bold leading-8">
          홍길동님에게 특화된 서비스를
          <br />
          제공해드릴 수 있는 PB입니다.
        </h3>
        <p className="text-xs">해당 추천은 투자성향 설문을 바탕으로 추천된 리스트입니다.</p>
        <PbCardList props={pblistData} />
      </section>
    </div>
  );
}

export default RecommendPage;
