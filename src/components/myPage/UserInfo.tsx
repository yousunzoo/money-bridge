import { Propensity } from "@/constants/enum";
import { IUserInfoProps } from "@/types/my";
import React from "react";
import StepProgress from "./StepProgress";

function UserInfo({ data }: IUserInfoProps) {
  const { name, propensity, step, reservationCount, boardBookmark, userBookmark } = data;

  return (
    <section>
      <h2 className="mb-9 text-2xl font-bold">
        반가워요, {name}님!
        <br />
        {propensity && (
          <>
            나의 투자성향은 <span className="text-primary-light">{Propensity[propensity]}</span>
          </>
        )}
      </h2>
      <StepProgress step={step} />
    </section>
  );
}

export default UserInfo;
