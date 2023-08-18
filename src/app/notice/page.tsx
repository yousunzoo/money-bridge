import AccrodianList from "@/components/myPage/serviceCenterPage/AccordianList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
};

export const dynamic = "force-dynamic";

function NoticePage() {
  return (
    <>
      <AccrodianList type="notice" />
    </>
  );
}

export default NoticePage;
