import { stepProgressList } from "@/constants/stepProgressList";
import { IStepProgressProps, TProgress } from "@/types/my";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function StepProgress({ step }: IStepProgressProps) {
  return (
    <section className="mb-10">
      <ul className="flex w-full justify-between">
        {stepProgressList.map(progress => (
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
