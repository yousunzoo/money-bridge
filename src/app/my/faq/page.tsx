import TopNav from "@/components/common/TopNav";
import AccordianList from "@/components/myPage/serviceCenterPage/AccordianList";

function FAQPage() {
  return (
    <>
      <TopNav title="자주 묻는 질문" hasBack={true} />
      <AccordianList type="faq" />
    </>
  );
}

export default FAQPage;
