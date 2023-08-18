import AccordianList from "@/components/myPage/serviceCenterPage/AccordianList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

export const dynamic = "force-dynamic";

function FAQPage() {
  return (
    <>
      <AccordianList type="faq" />
    </>
  );
}

export default FAQPage;
