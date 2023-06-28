"use client";
import { getLoginedUserInfo } from "@/app/apis/services/auth";
import { getRecommendedPBList } from "@/app/apis/services/user";
import ButtonModal from "@/components/common/ButtonModal";
import PbCardList from "@/components/common/Card/CardList/PbCardList";
import TopNav from "@/components/common/TopNav";
import PropensityCard from "@/components/pblistPage/PropensityCard";
import { ILoginedUserInfo, IModalContents } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RecommendPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalContents, setModalContents] = useState<IModalContents>({ content: "", confirmText: "" });
  const { data, isLoading, isSuccess, isError } = useQuery<ILoginedUserInfo, AxiosError>(
    ["loginedUserInfo"],
    getLoginedUserInfo,
  );

  useEffect(() => {
    if (isSuccess && data?.role === "PB") {
      setIsOpen(true);
      setModalContents({
        content: "투자자 전용 페이지입니다.",
        confirmText: "확인",
        confirmFn: () => router.back(),
      });
      return;
    }

    if (isError || (isSuccess && !data?.propensity)) {
      setIsOpen(true);
      setModalContents({
        content: "투자성향을 분석하시겠어요?",
        confirmText: "분석하기",
        confirmFn: () => router.push("/analysis"),
      });
      return;
    }
  }, [data, isLoading, isSuccess, isError]);

  return (
    <>
      <TopNav title="추천 PB 리스트" hasBack={true} />
      {data && data.role === "USER" && (
        <>
          <section className="mb-20">
            <h3 className="mb-8 text-2xl font-bold">{data.name}님의 투자성향은</h3>
            <PropensityCard userPropensity={data.propensity} />
          </section>
          <section>
            <h3 className="mb-2 text-2xl font-bold leading-8">
              {data.name}님에게 특화된 서비스를
              <br />
              제공해드릴 수 있는 PB입니다.
            </h3>
            <p className="mb-8 text-sm">해당 추천은 투자성향 설문을 바탕으로 추천된 리스트입니다.</p>
            <PbCardList queryKey="recommendedPB" api={getRecommendedPBList} bookmarks={true} />
          </section>
        </>
      )}
      {isOpen && (
        <ButtonModal isOpen={isOpen} setIsOpen={setIsOpen} modalContents={modalContents}>
          {!data?.propensity && data?.role !== "PB" && (
            <p>
              투자분석으로 나에게 딱 맞는 PB를
              <br /> 추천 받을 수 있어요!
            </p>
          )}
        </ButtonModal>
      )}
    </>
  );
}

export default RecommendPage;
