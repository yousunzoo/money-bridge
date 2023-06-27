import LocationCopyButton from "@/components/common/LocationCopyButton";
import React from "react";

interface ConsultationLocationSectionProps {
  type: string;
  role: string;
  location: string;
  locationAddress: string;
}

function ConsultationLocationSection({ type, role, location, locationAddress }: ConsultationLocationSectionProps) {
  return (
    <section className="flex flex-col pb-4 mb-4 border-b-1">
      <div className="flex justify-between">
        <span className="font-bold">상담 방식</span>
        <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>
          {type === "VISIT" ? "방문상담" : "유선상담"}
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="font-bold">미팅 장소</span>

        <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>
          {location === null ? "유선으로 결정" : location}
        </span>
      </div>
      {locationAddress && <LocationCopyButton location={locationAddress} />}
    </section>
  );
}

export default ConsultationLocationSection;
