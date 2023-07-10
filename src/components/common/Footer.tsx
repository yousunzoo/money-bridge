"use client";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname } from "next/navigation";

const FOOTER_NOTICE_INFO = [
  { id: 1, title: "사업자 등록번호", text: "711-86-00050" },
  { id: 2, title: "통신판매업신고", text: "제2020-서울영등포-2864호" },
  { id: 3, title: "통신판매업신고", text: "10-2016-00262203" },
  { id: 4, title: "주소", text: "서울시 영등포구 당산로 41길 11, E동 1202호" },
];

const FOOTER_CUSTOMER_INFO = [
  { id: 1, title: "1:1 문의", text: "help@sysmetic.co.kr" },
  { id: 2, title: "제휴문의", text: "ceo@sysmetic.co.kr" },
  { id: 3, title: "TEL", text: "02-6338-1880" },
];

const FOOTER_COMPANY_INFO = [
  { id: 1, title: "공지사항", href: "/notice" },
  { id: 2, title: "FAQ", href: "/faq" },
  { id: 3, title: "이용약관", href: "/terms" },
];
const FOOTER_UNLIST = ["login", "join"];
function Footer() {
  const currentPath = usePathname();
  const inValueIncluded = FOOTER_UNLIST.some(value => currentPath.includes(value));
  return (
    !inValueIncluded && (
      <footer className="relative bottom-0 mx-[-16px] mt-4 flex h-[410px] flex-col justify-between gap-10 border-t-1 border-button-inactive bg-background-primary p-8 md:h-[280px] md:flex-row">
        <section className="md:mix-w-[320px] flex w-auto flex-col md:max-w-[350px] ">
          <h3 className="font-bold text-md">Notice</h3>
          <p className="w-auto mt-2 text-xs break-words">
            머니브릿지 서비스의 모든 내용은 정보를 제공하기 위함이며, 본 플랫폼에서 직접적인 투자권유를 하고 있지
            않습니다. 증권사 PB의 정보를 중개하는 목적으로 운영되고 있으며 머니브릿지는 매칭 이후 발생하는 내용에 대해서
            알지 못하며 어떠한 책임도 없고 모든 책임과 발생한 결과는 투자자 본인의 책임입니다.
          </p>
          <ul className="gap-1 mt-4 text-xs">
            {FOOTER_NOTICE_INFO.map(item => (
              <li className="flex" key={item.id}>
                <h4 className="w-[90px] font-bold">{item.title}</h4>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mix-w-[300px] flex justify-between md:w-1/2">
          <article>
            <h3 className="font-bold text-md">고객센터</h3>
            <ul className="flex flex-col gap-1 mt-2 text-xs font-bold">
              {FOOTER_CUSTOMER_INFO.map(item => (
                <li className="flex gap-2" key={item.id}>
                  <h4 className="w-[50px] font-bold">{item.title}</h4>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3 className="font-bold text-md">회사소개</h3>
            <ul className="flex flex-col gap-1 mt-2 text-xs font-bold">
              {FOOTER_COMPANY_INFO.map(item => (
                <Link key={item.id} href={item.href} className="flex items-center ">
                  <IoIosArrowForward />
                  <h4>{item.title}</h4>
                </Link>
              ))}
            </ul>
          </article>
        </section>
      </footer>
    )
  );
}

export default Footer;
