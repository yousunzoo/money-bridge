import TopNav from "@/components/common/TopNav";
import PbPersonalInformation from "@/constants/provisions/pb/PbPersonalInformation";
import PbSysmetic from "@/constants/provisions/pb/PbSysmetic";
import PbThirdParty from "@/constants/provisions/pb/PbThirdParty";
import UserPersonalInformation from "@/constants/provisions/user/UserPersonalInformation";
import UserSysmetic from "@/constants/provisions/user/UserSysmetic";
import UserThirdParty from "@/constants/provisions/user/UserThirdParty";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "이용약관",
};

function TermsPage() {
  const userProvisions = [
    <UserSysmetic key="sysmetic" />,
    <UserPersonalInformation key="userInfo" />,
    <UserThirdParty key="userThird" />,
  ];
  const PbProvisions = [
    <PbSysmetic key="sysmetic" />,
    <PbPersonalInformation key="pbInfo" />,
    <PbThirdParty key="pbThird" />,
  ];

  return (
    <>
      <TopNav title="서비스 약관" hasBack={true} />
      <h2 className="mb-4 text-2xl font-bold">이용 약관</h2>
      <h3 className="mb-4 text-2xl font-bold">투자자 이용 약관</h3>
      {...userProvisions}

      <h3 className="mb-4 text-2xl font-bold">PB 이용 약관</h3>
      {...PbProvisions}
    </>
  );
}

export default TermsPage;
