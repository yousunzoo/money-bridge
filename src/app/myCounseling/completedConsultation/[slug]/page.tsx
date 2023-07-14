"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import DoubleButton from "@/components/common/DoubleButton";
import { redirect, useRouter } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useUserReservationInfo } from "@/hooks/useGetUserReservationInfo";
import ErrorModal from "@/components/common/ErrorModal";
import SingleButton from "@/components/common/SingleButton";

function CompletedConsultationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  const { reservationInfo, reservationError } = useUserReservationInfo(slug);

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  if (reservationInfo === undefined) return;
  const {
    reservationId,
    time,
    name,
    phoneNumber,
    pbId,
    type,
    location,
    locationAddress,
    goal,
    question,
    profileImage,
    reviewCheck,
  } = reservationInfo;
  if (!userInfo) return;
  const role = userInfo?.role;
  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  const scheduleSectionProps = { role, time };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  const reReservationHandler = () => {
    router.push(`/reservation?pbId=${pbId}`);
  };

  const writeReviewHandler = () => {
    if (reviewCheck) {
      router.push(`/myCounseling/myReview/${reservationId}`);
      return;
    }
    router.push(`/myCounseling/reviewWrite/${reservationId}`);
  };
  const checkClickHandler = () => {
    router.push("/myCounseling?process=COMPLETE");
  };
  if (userInfo?.role !== "USER")
    return (
      <ErrorModal isError={true} path={"/myCounseling?process=APPLY"} content={"권한이 없습니다. 다시 시도해주세요."} />
    );
  if (reservationError)
    return (
      <ErrorModal
        isError={true}
        path={"/myCounseling?process=APPLY"}
        content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."}
      />
    );
  return (
    <div>
      <div className="user_top_Phrase mx-[-16px] mt-4 box-content w-full">
        <span className="text-white ">상담이 완료되었습니다.</span>
      </div>
      <UserReservationItem buttonName="PB 정보" href={`/detail/info/${pbId}`} isRole={"PB"} profileImage={profileImage}>
        <p className="font-bold">{name}</p>
        <p className="text-xs ">{formattedPhoneNumber}</p>
        <p className="text-xs ">{type === "VISIT" ? "방문상담" : "유선상담"} </p>
      </UserReservationItem>

      <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
        <ConsultationScheduleSection {...scheduleSectionProps} />
        <ConsultationLocationSection {...locationSectionProps} />
        <ConsultationNoteSection {...noteSectionProps} />
        <div className="flex flex-col items-center pt-6 text-xs">
          <p className="font-bold text-secondary-heavy">상담이 완료되었습니다.</p>
          <p className="text-secondary-heavy">{reviewCheck && "상담 후기를 작성해주세요."}</p>
        </div>
        <DoubleButton
          reviewCheck={reviewCheck}
          firstTitle={"상담 다시 신청하기"}
          secondTitle={"후기 작성"}
          firstClickFunc={reReservationHandler}
          secondClickFunc={writeReviewHandler}
          role={"USER"}
        />
        <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
      </section>
    </div>
  );
}

export default CompletedConsultationPage;
