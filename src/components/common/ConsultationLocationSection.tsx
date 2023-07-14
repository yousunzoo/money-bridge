import LocationCopyButton from "@/components/common/LocationCopyButton";
interface ConsultationLocationSectionProps {
  type: string;
  role: string;
  location: string;
  locationAddress: string;
}

function ConsultationLocationSection({ type, role, location, locationAddress }: ConsultationLocationSectionProps) {
  return (
    <section className="mb-4 flex flex-col border-b-1 pb-4">
      <div className="flex justify-between">
        <span className="font-bold">상담 방식</span>
        <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>
          {type === "VISIT" ? "방문상담" : "유선상담"}
        </span>
      </div>
      <div className="mt-2 flex justify-between">
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
