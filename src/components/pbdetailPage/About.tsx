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
import { styleCase } from "@/utils/consultStyle";
import PbReviewItem from "@/components/pbdetailPage/pbreviewPage/PbReviewItem";
import { AxiosError } from "axios";
import { IAboutData, IPbReview, IReviewStyles } from "@/types/pb";
import { IDataResponse, IListResponse } from "@/types/common";
import { IPbCard } from "@/types/card";

function About({ aboutData, role, Id }: { aboutData: IAboutData; role: string; Id: number }) {
  const { id, name, branchAddress, branchName, branchLatitude, branchLongitude } = aboutData;
  const { data: review } = useQuery<IDataResponse<IReviewStyles>, AxiosError>({
    queryKey: ["getReviewStyle", id],
    queryFn: () => getReviewStyle(id),
    refetchOnWindowFocus: false,
  });
  const reviewData = review?.data;
  const { data: same } = useQuery<IListResponse<IPbCard>, AxiosError>({
    queryKey: ["getSamePb", id],
    queryFn: () => getSamePb(id),
    refetchOnWindowFocus: false,
  });
  const sameData = same?.list;
  const { data: PbRecentReview } = useQuery<IListResponse<IPbReview>, AxiosError>({
    queryKey: ["getPbReviewRecent", id],
    queryFn: () => getPbReviewRecent(id),
    refetchOnWindowFocus: false,
  });
  const pbRecentData = PbRecentReview?.list;
  const { data: pbReviewData } = useQuery<IListResponse<IPbReview>, AxiosError>({
    queryKey: ["getPbReview", id],
    queryFn: () => getPbReview(id, 0),
    refetchOnWindowFocus: false,
  });

  const router = useRouter();
  const pathname: string = usePathname();
  const myId: number | undefined = getMyId(role, Id, id);

  const goToPage = () => {
    if (role === CommonROLE.USER) {
      router.push(`/reservation?pbId=${id}`);
    } else if (role === CommonROLE.PB) {
      if (pathname === `/detail/info/${myId}`) {
        router.push("/my/editProfile");
      } else {
        router.push(`/reservation?pbId=${id}`);
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
      {(reviewData.style1 || reviewData.style2 || reviewData.style3) && (
        <>
          <p className="info_header">
            투자자 님들의
            <br />
            실제 상담 후기
          </p>
          <div className="card mb-[46px] flex h-[154px] w-full flex-col justify-center">
            <p className="mx-auto mb-[15px] flex text-xs">
              "투자자님들이 말하는&nbsp;<span className="font-bold">{name} PB의 매력</span>은?"
            </p>
            <div className="mx-auto flex w-full px-[51px]">
              {reviewData.style1 && (
                <div className="review_section">
                  <Image
                    src={styleCase(reviewData.style1).image}
                    alt={styleCase(reviewData.style1).style}
                    width={56}
                    height={56}
                    className="mx-auto h-[56px] w-[56px]"
                  />
                  <p className="review_text">{styleCase(reviewData.style1).style}</p>
                </div>
              )}
              {reviewData.style2 && (
                <div className="review_section">
                  <Image
                    src={styleCase(reviewData.style2).image}
                    alt={styleCase(reviewData.style2).style}
                    width={56}
                    height={56}
                    className="mx-auto h-[56px] w-[56px]"
                  />
                  <p className="review_text">{styleCase(reviewData.style2).style}</p>
                </div>
              )}
              {reviewData.style3 && (
                <div className="review_section">
                  <Image
                    src={styleCase(reviewData.style3).image}
                    alt={styleCase(reviewData.style3).style}
                    width={56}
                    height={56}
                    className="mx-auto h-[56px] w-[56px]"
                  />
                  <p className="review_text">{styleCase(reviewData.style3).style}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="mb-20">
        {pbReviewData && pbReviewData.list?.length > 0 && (
          <div className="flex w-full items-center">
            <p className="w-full text-xs font-bold">
              후기 {pbReviewData.totalElements ? pbReviewData.totalElements : 0}건
            </p>
            <Link href={`/detail/review/${id}`} className="flex w-full justify-end text-sm underline">
              전체보기
            </Link>
          </div>
        )}
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
        <p className="info_header">방문 상담을 원하시나요?</p>
        <div className="card h-[240px] p-[18px]">
          <p className="text-base font-bold">{branchName}</p>
          <div className="flex text-xs">
            <p className="flex-1">{branchAddress}</p>
            <LocationCopyButton location={branchAddress} />
          </div>
          <div className="mt-4 h-[140px]">
            <LocationCard latitude={branchLatitude} longitude={branchLongitude} />
          </div>
        </div>
      </div>

      <div className="mt-[90px]">
        <p className="info_header">
          핏에 맞는 다른 PB도
          <br />
          함께 만나보세요
        </p>
        <ul>
          {sameData?.map(item => (
            <PbCardItem key={item.id} item={item} queryKey={"getSamePb"} bookmarks={true} />
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
