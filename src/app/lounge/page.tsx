import Intro from "@/components/loungePage/Intro";
import PbRecommend from "@/components/loungePage/PbRecommend";
import Content from "@/components/loungePage/Content";

export const dynamic = "force-dynamic";

function Lounge() {
  return (
    <>
      <Intro />
      <PbRecommend />
      <Content />
    </>
  );
}

export default Lounge;
