import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "머니브릿지 | 나의 후기",
};

function MyCounselingMyReviewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default MyCounselingMyReviewLayout;
