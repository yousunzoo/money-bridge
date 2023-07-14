import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "로그인",
};

function Login({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default Login;
