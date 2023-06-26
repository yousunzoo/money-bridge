import React from "react";
import Carousel from "antd/lib/carousel";
import "@/styles/defaultCarousel.css";
import LocationCard from "@/components/common/LocationCard";
import Image from "next/image";
import Link from "next/link";
import "@/styles/pb.css";
import { useRouter, usePathname } from "next/navigation";
import { CommonROLE } from "@/constants/enum";
import LocationCopyButton from "@/components/common/LocationCopyButton";
import { getSamePb, getPbReviewRecent, getReviewStyle, getPbReview } from "@/app/apis/services/pb";
import { useQuery } from "@tanstack/react-query";
import PbCardItem from "@/components/common/Card/CardItem/PbCardItem";
import { getMyId } from "@/utils/pbMyId";
import { styleCase } from "@/utils/ConsultationStyle";
import PbReviewItem from "@/components/pbdetailPage/pbreviewPage/PbReviewItem";
import { AxiosError } from "axios";
import { IAboutData, IPbReview, IReviewStyles } from "@/types/pb";
import { IDataResponse, IListResponse } from "@/types/common";
import { IPbCard } from "@/types/card";

function About({ aboutData, role, Id }: { aboutData: IAboutData; role: string; Id: number }) {
  const { id, name, branchAddress, branchName, companyName, branchLatitude, branchLongitude } = aboutData;
  const { data: review } = useQuery<IDataResponse<IReviewStyles>, AxiosError>(["getReviewStyle"], () =>
    getReviewStyle(id),
  );
  const reviewData = review?.data;
  const { data: same } = useQuery<IListResponse<IPbCard>, AxiosError>(["getSamePb"], () => getSamePb(id));
  const sameData = same?.list;
  const { data: PbRecentReview } = useQuery<IListResponse<IPbReview>, AxiosError>(["getPbReviewRecent"], () =>
    getPbReviewRecent(id),
  );
  const pbRecentData = PbRecentReview?.list;
  const { data: PbReview } = useQuery<IDataResponse<IPbReview>, AxiosError>(["getPbReview"], () => getPbReview(id, 0));
  const pbReviewData = PbReview;
  const router = useRouter();
  const pathname: string = usePathname();
  const myId: number | undefined = getMyId(role, Id, id);

  const goToPage = () => {
    if (role === CommonROLE.USER) {
      router.push("/reservation");
    } else if (role === CommonROLE.PB) {
      if (pathname === `/detail/info/${myId}`) {
        router.push("/detail/edit");
      } else {
        router.push("/reservation");
      }
    }
  };

  let text;
  if (role === CommonROLE.USER) {
    text = "상담 신청하기";
  } else if (role === CommonROLE.PB) {
    if (pathname === `/detail/info/${myId}`) {
      text = "프로필 수정하기";
    } else {
      text = "상담 신청하기";
    }
  }
  if (!reviewData || !sameData) return null;
  return (
    <div>
      <div className="info_header">
        투자자 님들의
        <br />
        실제 상담 후기
      </div>
      <div className="card mb-[46px] flex h-[154px] w-full flex-col justify-center">
        <div className="mx-auto mb-[15px] flex text-xs">
          "투자자님들이 말하는&nbsp;<p className="font-bold">{name} PB의 매력</p>은?"
        </div>
        <div className="mx-auto flex w-full grid-cols-1 px-[51px]">
          <div className="review_section">
            <Image
              src={styleCase(reviewData.style1).image}
              alt={styleCase(reviewData.style1).style}
              width={56}
              height={56}
              className="h-[56px] w-[56px]"
            />
            <div className="review_text">{styleCase(reviewData.style1).style}</div>
          </div>
          <div className="review_section">
            <Image
              src={styleCase(reviewData.style2).image}
              alt={styleCase(reviewData.style2).style}
              width={56}
              height={56}
              className="h-[56px] w-[56px]"
            />
            <div className="review_text">{styleCase(reviewData.style2).style}</div>
          </div>
          <div className="review_section">
            <Image
              src={styleCase(reviewData.style3).image}
              alt={styleCase(reviewData.style3).style}
              width={56}
              height={56}
              className="h-[56px] w-[56px]"
            />
            <div className="review_text">{styleCase(reviewData.style3).style}</div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="flex w-full items-center">
          {pbReviewData && pbReviewData.data && (
            <>
              <div className="w-full text-xs font-bold">
                후기 {pbReviewData.totalElements ? pbReviewData.totalElements : 0}건
              </div>
              <Link href={`/detail/review/${id}`} className="flex w-full justify-end text-sm underline">
                전체보기
              </Link>
            </>
          )}
        </div>
        {pbRecentData && pbRecentData.length > 0 && (
          <ul>
            <Carousel autoplay draggable={true}>
              {pbRecentData?.map(item => (
                <PbReviewItem key={item.reviewId} item={item} />
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
          {sameData?.map(item => (
            <PbCardItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <button className="button_fixed" onClick={() => goToPage()}>
        {text}
      </button>
    </div>
  );
}

export default About;
