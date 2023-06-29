import TopNav from "@/components/common/TopNav";
import CommonPersonalInformation from "@/constants/provisions/common/CommonPersonalInformation";
import PbSysmetic from "@/constants/provisions/pb/PbSysmetic";
import UserSysmetic from "@/constants/provisions/user/UserSysmetic";
import { usePathname } from "next/navigation";
import React from "react";
import { CgCloseR } from "react-icons/cg";

type Tstep = 0 | 1;

const userProvisions = {
  0: <UserSysmetic />,
  1: <CommonPersonalInformation />,
};

const PbProvisions = {
  0: <PbSysmetic />,
  1: <CommonPersonalInformation />,
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
      <div className="top-25 fixed w-full min-w-[358px] max-w-[732px] pr-5 text-right">
        <button className="bg-white text-2xl" onClick={handleCloseProvision}>
          <CgCloseR className="text-5xl" />
        </button>
      </div>
      {provisions[step]}
    </>
  );
}

export default DetailProvision;
