"use client";
import { redirect } from "next/navigation";

function FindPassword() {
  redirect("/login");
  return <></>;
}

export default FindPassword;
