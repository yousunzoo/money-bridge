import React from "react";
import Carousel from "antd/lib/carousel";
import "@/styles/defaultCarousel.css";
import { ConsultationStyle } from "@/constants/enum";
import LocationCard from "@/components/common/LocationCard";
import Image from "next/image";
import Link from "next/link";
import PbReview from "@/mocks/hyeon17/PbDetail/Review/pbreview.json";
import "@/styles/pb.css";
import { useRouter, usePathname } from "next/navigation";
import { CommonROLE } from "@/constants/enum";
import LocationCopyButton from "@/components/common/LocationCopyButton";
import { getSamePb, getPbReviewRecent, getReviewStyle } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";

function About({ aboutData, role }: any) {
  const { id, name, branchAddress, branchName, companyName, branchLatitude, branchLongitude } = aboutData;
  const { data: review } = useQuery([`/review/style/${id}`], () => getReviewStyle(id));
  const reviewData = review?.data;
  const { data: same } = useQuery([`/auth/${id}/same`], () => getSamePb(id));
  const sameData = same?.data.list;
  const { data: PbRecentReview } = useQuery([`/reviews/${id}`], () => getPbReviewRecent(1));
  const pbRecentData = PbRecentReview?.data;
  const pbReviewData = PbReview?.data;
  const router = useRouter();
  const pathname = usePathname();

  const styleCase = (style: string): { style: ConsultationStyle; image: string } => {
    switch (style) {
      case "METICULOUS":
        return { style: ConsultationStyle.METICULOUS, image: "/assets/images/counselingStyle/METICULOUS.svg" };
      case "FAST":
        return { style: ConsultationStyle.FAST, image: "/assets/images/counselingStyle/FAST.svg" };
      case "KIND":
        return { style: ConsultationStyle.KIND, image: "/assets/images/counselingStyle/KIND.svg" };
      case "PROFESSIONAL":
        return {
          style: ConsultationStyle.PROFESSIONAL,
          image: "/assets/images/counselingStyle/PROFESSIONAL.svg",
        };
      case "HONEST":
        return { style: ConsultationStyle.HONEST, image: "/assets/images/counselingStyle/HONEST.svg" };
      case "PRAGMATIC":
        return { style: ConsultationStyle.PRAGMATIC, image: "/assets/images/counselingStyle/PRAGMATIC.svg" };
      case "DIRECTIONAL":
        return { style: ConsultationStyle.DIRECTIONAL, image: "/assets/images/counselingStyle/DIRECTIONAL.svg" };
      default:
        return { style: ConsultationStyle.null, image: "" };
    }
  };

  const goToPage = () => {
    if (role === CommonROLE.USER) {
      router.push("/reservation");
    } else if (role === CommonROLE.PB) {
      if (pathname === "/detail/info") {
        router.push("/detail/edit");
      }
      if (pathname === "/detail/content") {
        router.push("/lounge/write");
      }
    }
  };

  let text;
  if (role === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (role === CommonROLE.PB) {
    if (pathname === "/detail/info") {
      text = "프로필 수정하기";
    }
    if (pathname === "/detail/content") {
      text = "콘텐츠 작성하기";
    }
  }

  return (
    <article>
      <div className="info_header">
        투자자 님들의
        <br />
        실제 상담 후기
      </div>
      <div className="card mb-[46px] flex h-[154px] w-full flex-col justify-center">
        <div className="mx-auto mb-[15px] flex text-xs">
          "투자자님들이 말하는&nbsp;<p className="font-bold">{name} PB의 매력</p>은?"
        </div>
        <div className="mx-auto flex w-full justify-between px-[51px]">
          <div className="review_section">
            <Image
              src={styleCase(reviewData?.style1)?.image}
              alt={styleCase(reviewData?.style1)?.style}
              width={56}
              height={56}
            />
            <div className="review_text">{styleCase(reviewData?.style1)?.style}</div>
          </div>
          <div className="review_section">
            <Image
              src={styleCase(reviewData?.style2)?.image}
              alt={styleCase(reviewData?.style2)?.style}
              width={56}
              height={56}
            />
            <div className="review_text">{styleCase(reviewData?.style2)?.style}</div>
          </div>
          <div className="review_section">
            <Image
              src={styleCase(reviewData?.style3)?.image}
              alt={styleCase(reviewData?.style3)?.style}
              width={56}
              height={56}
            />
            <div className="review_text">{styleCase(reviewData?.style3)?.style}</div>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <div className="flex w-full items-center">
          <div className="w-full text-xs font-bold">후기 {pbReviewData ? pbReviewData.totalElements : 0}건</div>
          {pbReviewData && (
            <Link href="/detail/review" className="flex w-full justify-end text-sm underline">
              전체보기
            </Link>
          )}
        </div>
        {pbRecentData?.length>0 && (
          <ul>
            <Carousel autoplay draggable={true}>
              {pbRecentData.list.map((item: any) => (
                <li className="card h-[188px] p-[15px]" key={item.reviewId}>
                  <div className="mb-[9px] flex items-end">
                    <div className="mr-2 text-sm font-bold">{item.userName}님</div>
                    <div className="text-xs">{item.createdAt}</div>
                  </div>
                  <div className="h-[90px] rounded-md bg-background-secondary p-3.5 text-xs">{item.content}</div>
                  <ul className="mt-3 flex">
                    {item.list.map((styles: any, idx: number) => (
                      <li key={idx} className="mr-[7px]">
                        {styles.style}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </Carousel>
          </ul>
        )}
      </div>
      <div>
        <div className="info_header">방문 상담을 원하시나요?</div>
        <div className="card h-[240px] p-[18px]">
          <div className="text-base font-bold">
            {companyName}&nbsp;{branchName}
          </div>
          <div className="flex text-xs">
            <div className="flex-1">{branchAddress}</div>
            <LocationCopyButton location={branchAddress} />
          </div>
          <div className="mt-4 h-[140px]">
            <LocationCard latitude={branchLatitude} longitude={branchLongitude} />
          </div>
        </div>
      </div>
      <div className="mt-[90px]">
        <div className="info_header">
          핏에 맞는 다른 PB도
          <br />
          함께 만나보세요
        </div>
        <ul>
          {sameData?.map((item: any) => (
            <PbCardItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <button className="button_fixed" onClick={() => goToPage()}>
        {text}
      </button>
    </article>
  );
}

export default About;
