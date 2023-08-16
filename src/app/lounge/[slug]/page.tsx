import LoungeHot from "../../../components/loungePage/LoungeHot";
import LoungeNew from "@/components/loungePage/LoungeNew";
import LoungeSearch from "@/components/loungePage/LoungeSearch";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const slug = params.slug;
  return {
    title: slug === "hot" ? "인기 컨텐츠" : slug === "new" ? "최신 컨텐츠" : "컨텐츠 검색",
  };
}

function LoungeDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return <>{slug == "hot" ? <LoungeHot /> : slug === "new" ? <LoungeNew /> : <LoungeSearch />}</>;
}

export default LoungeDetailPage;
