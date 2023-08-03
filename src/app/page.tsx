import AdminButtonSection from "@/components/mainPage/AdminButtonSection";
import CarouselBanner from "@/components/mainPage/CarouselBanner";
import CustomListSection from "@/components/mainPage/CustomListSection";
import HydratePbList from "@/components/mainPage/HydratePbList";
import PbListSection from "@/components/mainPage/PbListSection";
import SpecialtySection from "@/components/mainPage/SpecialtySection";
import StockFirmSection from "@/components/mainPage/StockFirmSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div>
      <AdminButtonSection />
      <CarouselBanner />
      {/* <PbListSection /> */}
      <HydratePbList />
      <SpecialtySection />
      {/* <CustomListSection /> */}
      {/* <StockFirmSection /> */}
    </div>
  );
}
