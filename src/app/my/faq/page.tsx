import TopNav from "@/components/common/TopNav";
import AccrodianList from "@/components/myPage/serviceCenterPage/AccrodianList";
import faqData from "@/mocks/seon/faq.json";
function FAQPage() {
  const faqList = faqData.data.list;
  return (
    <>
      <TopNav title="자주 묻는 질문" hasBack={true} />
      <AccrodianList list={faqList} />
    </>
  );
}

export default FAQPage;
