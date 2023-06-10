import Link from "next/link";
import ConsultationStatus from "./ConsultationStatus";
import TopNav from "@/components/common/TopNav";

const LINKS = [
  { text: "신규예약", href: "APPLY" },
  { text: "상담확정", href: "CONFIRM" },
  { text: "상담완료", href: "COMPLETE" },
  { text: "예약취소", href: "WITHDRAW" },
];

export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <TopNav title={"고객관리"} />
        <ConsultationStatus />
        <ul className="my-4 flex justify-start px-4">
          {LINKS.map(item => (
            <li key={item.text} className="mx-2">
              <Link
                href={`management/${item.href}`}
                replace
                className="rounded-full border-2 border-black p-2 focus:bg-black focus:text-white "
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section>{children}</section>
    </>
  );
}
