import CommonPersonalInformation from "@/constants/provisions/common/CommonPersonalInformation";
import PbSysmetic from "@/constants/provisions/pb/PbSysmetic";
import UserSysmetic from "@/constants/provisions/user/UserSysmetic";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "이용약관",
};

function TermsPage() {
  const userProvisions = [<UserSysmetic key="sysmetic" />, <CommonPersonalInformation key={"personalInformation"} />];
  const PbProvisions = [<PbSysmetic key="sysmetic" />, <CommonPersonalInformation key={"personalInformation"} />];

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">이용 약관</h2>
      {...userProvisions}
      <br />
      <br />
      {...PbProvisions}
    </>
  );
}

export default TermsPage;
