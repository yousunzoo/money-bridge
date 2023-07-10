import AccrodianList from "@/components/myPage/serviceCenterPage/AccordianList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
};

function NoticePage() {
  return (
    <>
      <AccrodianList type="notice" />
    </>
  );
}

export default NoticePage;
