import AccordianList from "@/components/myPage/serviceCenterPage/AccordianList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};
function FAQPage() {
  return (
    <>
      <AccordianList type="faq" />
    </>
  );
}

export default FAQPage;
