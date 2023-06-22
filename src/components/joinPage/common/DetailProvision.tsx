import TopNav from "@/components/common/TopNav";
import PbPersonalInformation from "@/constants/provisions/pb/PbPersonalInformation";
import PbSysmetic from "@/constants/provisions/pb/PbSysmetic";
import PbThirdParty from "@/constants/provisions/pb/PbThirdParty";
import UserPersonalInformation from "@/constants/provisions/user/UserPersonalInformation";
import UserSysmetic from "@/constants/provisions/user/UserSysmetic";
import UserThirdParty from "@/constants/provisions/user/UserThirdParty";
import { usePathname } from "next/navigation";
import React from "react";

type Tstep = 0 | 1 | 2;

const userProvisions = {
  0: <UserSysmetic />,
  1: <UserPersonalInformation />,
  2: <UserThirdParty />,
};

const PbProvisions = {
  0: <PbSysmetic />,
  1: <PbPersonalInformation />,
  2: <PbThirdParty />,
};

function DetailProvision({
  handleCloseProvision,
  provisionId,
}: {
  handleCloseProvision: () => void;
  provisionId: number;
}) {
  const pathName = usePathname();
  const provisions = pathName.split("/")[2] === "user" ? userProvisions : PbProvisions;
  const step = provisionId as Tstep;
  return (
    <>
      <TopNav title={`${pathName.split("/")[2] === "user" ? "유저" : "PB"} 회원가입`} backGroundWhite />
      <button
        className="fixed bottom-28 right-5 rounded-md border-1 bg-background-secondary p-2 text-2xl"
        onClick={handleCloseProvision}
      >
        닫기
      </button>
      {provisions[step]}
    </>
  );
}

export default DetailProvision;
