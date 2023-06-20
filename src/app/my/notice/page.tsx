import TopNav from "@/components/common/TopNav";
import AccrodianList from "@/components/myPage/serviceCenterPage/AccrodianList";
import noticeData from "@/mocks/seon/notice.json";

function NoticePage() {
  interface INotice {
    id: number;
    title: string;
    content: string;
    date: string;
  }
  const noticeList = noticeData.data.list as INotice[];

  return (
    <>
      <TopNav title="공지사항" hasBack={true} />
      <AccrodianList list={noticeList} />
    </>
  );
}

export default NoticePage;
