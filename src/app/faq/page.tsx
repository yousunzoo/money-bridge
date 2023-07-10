import TopNav from "@/components/common/TopNav";
import AccordianList from "@/components/myPage/serviceCenterPage/AccordianList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};
function FAQPage() {
  return (
    <>
      <TopNav title="자주 묻는 질문" hasBack={true} />
      <AccordianList type="faq" />
    </>
  );
}

export default FAQPage;
