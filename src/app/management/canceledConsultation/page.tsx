"use client";
import { redirect } from "next/navigation";
import React from "react";

function CanceledConsultationPage() {
  redirect("/management");
  return <></>;
}

export default CanceledConsultationPage;
