"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function FindPassword() {
  const router = useRouter();
  useEffect(() => {
    router.push("/findPassword/1");
  }, []);
  return <></>;
}

export default FindPassword;
