import TopNav from "@/components/common/TopNav";
import AccrodianList from "@/components/myPage/serviceCenterPage/AccordianList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
};

function NoticePage() {
  return (
    <>
      <TopNav title="공지사항" hasBack={true} />
      <AccrodianList type="notice" />
    </>
  );
}

export default NoticePage;
