import { IPropensityInfoCardProps } from "@/types/my";
import Image from "next/image";
import React from "react";

function PropensityInfoCard({ propensity, info }: IPropensityInfoCardProps) {
  return (
    <section className="w-full rounded-lg p-4 shadow-md">
      <h3 className="mb-4 border-b-1 border-dashed border-background-normal pb-4 text-2xl font-bold">{propensity}</h3>
      <ul>
        {info.map(text => (
          <li className="mb-1 flex items-center gap-2" key={text}>
            <Image src="/assets/images/checkProvision.svg" width={20} height={20} alt="check" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PropensityInfoCard;
