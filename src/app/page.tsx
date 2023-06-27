import TopNav from "@/components/common/TopNav";
import AdminButtonSection from "@/components/mainPage/AdminButtonSection";
import CarouselBanner from "@/components/mainPage/CarouselBanner";
import CustomListSection from "@/components/mainPage/CustomListSection";
import PbListSection from "@/components/mainPage/PbListSection";
import SearchLocation from "@/components/mainPage/SearchLocation";
import SpecialtySection from "@/components/mainPage/SpecialtySection";
import StockFirmSection from "@/components/mainPage/StockFirmSection";

export default async function Home() {
  return (
    <div>
      <AdminButtonSection />
      <TopNav title={"메인페이지"} />
      <CarouselBanner />
      <PbListSection />
      <SpecialtySection />
      <CustomListSection />
      <StockFirmSection />
    </div>
  );
}
