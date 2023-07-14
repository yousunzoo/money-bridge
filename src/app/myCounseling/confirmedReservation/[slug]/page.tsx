"use client";
import UserReservationItem from "@/components/common/Card/CardItem/UserReservationItem";
import ConsultationScheduleSection from "@/components/common/ConsultationScheduleSection";
import ConsultationLocationSection from "@/components/common/ConsultationLocationSection";
import ConsultationNoteSection from "@/components/common/ConsultationNoteSection";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { redirect, useRouter } from "next/navigation";
import { useUserReservationInfo } from "@/hooks/useGetUserReservationInfo";

import ErrorModal from "@/components/common/ErrorModal";
import SingleButton from "@/components/common/SingleButton";

function ConfirmedReservationPage({ params: { slug } }: { params: { slug: number } }) {
  const router = useRouter();
  const { userInfo, userLoading, isLogined } = useGetUserInfo();
  const { reservationInfo, reservationError } = useUserReservationInfo(slug);

  if (!isLogined && !userLoading) {
    redirect("/");
  }

  if (reservationInfo === undefined) return null;
  const { name, phoneNumber, type, location, locationAddress, goal, question, profileImage, pbId, time } =
    reservationInfo;

  if (!userInfo) return;

  const role = userInfo?.role;
  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  const checkClickHandler = () => {
    router.push("/myCounseling?process=CONFIRM");
  };

  const scheduleSectionProps = { time, role };
  const locationSectionProps = { type, role, location, locationAddress };
  const noteSectionProps = { role, goal, question };

  if (userInfo?.role !== "USER")
    return (
      <ErrorModal
        isError={true}
        path={"/myCounseling?process=CONFIRM"}
        content={"권한이 없습니다. 다시 시도해주세요."}
      />
    );
  if (reservationError)
    return (
      <ErrorModal
        isError={true}
        path={"/myCounseling?process=CONFIRM"}
        content={"일시적인 문제가 발생했습니다. 다시 시도해주세요."}
      />
    );
  return (
    <div>
      <div className="user_top_Phrase mx-[-16px] mt-4 box-content w-full">
        <span className="text-white ">상담이 확정되었습니다. 상담 일정을 확인해 주세요.</span>
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
        <div className="flex flex-col items-center py-6 text-xs">
          <p className="font-bold text-secondary-heavy">PB가 유선연락을 통해 일정과 장소를 확인해드립니다.</p>
          <p className="text-secondary-heavy">(영업일 1일 이내)</p>
        </div>
        <SingleButton title={"확인"} role={role} ClickFunc={checkClickHandler} />
      </section>
    </div>
  );
}

export default ConfirmedReservationPage;
