import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "로그인",
};

function Login({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default Login;
