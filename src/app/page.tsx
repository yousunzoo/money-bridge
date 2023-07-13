import AdminButtonSection from "@/components/mainPage/AdminButtonSection";
import CarouselBanner from "@/components/mainPage/CarouselBanner";
import CustomListSection from "@/components/mainPage/CustomListSection";
import PbListSection from "@/components/mainPage/PbListSection";
import SpecialtySection from "@/components/mainPage/SpecialtySection";
import StockFirmSection from "@/components/mainPage/StockFirmSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: '위치기반 투자자 PB 매칭 플랫폼, "머니브릿지"',
  openGraph: {
    title: "머니브릿지 - Money Bridge",
    description: "위치기반 투자자 PB 매칭 플랫폼",
    url: "https://www.moneybridge.co.kr/",
    siteName: "머니브릿지 - Money Bridge",
    images: [
      {
        url: "https://moneybridge.s3.ap-northeast-2.amazonaws.com/default/post.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.moneybridge.co.kr/",
    title: "머니브릿지 - Money Bridge",
    description: "위치기반 투자자 PB 매칭 플랫폼",
    images: ["https://moneybridge.s3.ap-northeast-2.amazonaws.com/default/post.png"],
  },
};

export default async function Home() {
  return (
    <div>
      <AdminButtonSection />
      <CarouselBanner />
      <PbListSection />
      <SpecialtySection />
      <CustomListSection />
      <StockFirmSection />
    </div>
  );
}
