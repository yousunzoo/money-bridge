"use client";
import { redirect } from "next/navigation";
import React from "react";

function CompletedConsultationPage() {
  redirect("/management");
  return <></>;
}

export default CompletedConsultationPage;
