import { IStepProgressProps, TProgress } from "@/types/my";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function StepProgress({ step }: IStepProgressProps) {
  const StepProgressList = [
    {
      type: "hasDonePropensity",
      text: "투자 성향 알아보기",
      defaultImage: "/assets/images/progressList/hasDonePropensity.svg",
      activeImage: "/assets/images/progressList/donePropensity.svg",
      link: "/analysis",
    },
    {
      type: "hasDoneBoardBookMark",
      text: "투자 정보 쌓아보기",
      defaultImage: "/assets/images/progressList/hasDoneBoardBookMark.svg",
      activeImage: "/assets/images/progressList/doneBoardBookMark.svg",
      link: "/lounge",
    },
    {
      type: "hasDoneReservation",
      text: "PB 매칭 시작하기",
      defaultImage: "/assets/images/progressList/hasDoneReservation.svg",
      activeImage: "/assets/images/progressList/doneReservation.svg",
      link: "/pblist",
    },
    {
      type: "hasDoneReview",
      text: "상담후기 작성하기",
      defaultImage: "/assets/images/progressList/hasDoneReview.svg",
      activeImage: "/assets/images/progressList/doneReview.svg",
      link: "",
    },
  ];

  return (
    <section className="mb-10">
      <ul className="flex w-full justify-between">
        {StepProgressList.map(progress => (
          <li key={progress.type} className="w-[76px]">
            <Link href={progress.link}>
              <div className="mx-auto mb-3 flex h-[76px] w-[76px] items-center justify-center rounded-[8px] bg-white shadow-md">
                <Image
                  src={step[progress.type as TProgress] ? progress.activeImage : progress.defaultImage}
                  alt={progress.text}
                  width={36}
                  height={36}
                />
              </div>
              <p className="break-keep text-center">{progress.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StepProgress;
