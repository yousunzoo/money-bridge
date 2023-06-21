import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";
import { IPBCard } from "@/types/my";

function RecommendPBList({ list }: { list: IPBCard[] }) {
  return (
    <section className="mb-20">
      <h3 className="mb-4 pb-4 text-2xl font-bold text-primary-normal">맞춤 PB 리스트</h3>
      <ul>
        {list.map(pbcardItem => (
          <PbCardItem key={pbcardItem.id} item={pbcardItem} />
        ))}
      </ul>
    </section>
  );
}

export default RecommendPBList;
