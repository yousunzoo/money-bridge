import TopNav from "@/components/common/TopNav";
import AccrodianList from "@/components/myPage/serviceCenterPage/AccordianList";
import noticeData from "@/mocks/seon/notice.json";

function NoticePage() {
  return (
    <>
      <TopNav title="공지사항" hasBack={true} />
      <AccrodianList type="notice" />
    </>
  );
}

export default NoticePage;
