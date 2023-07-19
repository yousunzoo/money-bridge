import LocationCopyButton from "./LocationCopyButton";

interface ConsultingHistoryProps {
  candidateTime1: string;
  candidateTime2: string;
  type: string;
  time?: string;
  location: string;
  locationAddress: string;
  goal: string;
  question: string;
  role: string;
  completionPhrase1: string;
  completionPhrase2?: string;
}

function ConsultingHistoryCard({
  candidateTime1,
  candidateTime2,
  type,
  time,
  location,
  locationAddress,
  goal,
  question,
  role,
  completionPhrase1,
  completionPhrase2,
}: ConsultingHistoryProps) {
  return (
    <section className="mt-6 w-full rounded-md bg-white p-4 pb-6 text-xs">
      <div className="mb-4 flex justify-between border-b-1 pb-4">
        {time ? (
          <>
            <h3 className="font-bold">상담 일정</h3>
            <div>
              <span
                className={
                  role === "USER" ? `ml-7 font-bold text-secondary-heavy` : `ml-7 font-bold text-primary-normal`
                }
              >
                {candidateTime1}
              </span>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-bold">상담 희망 일정</h3>

            <div>
              <div>
                <span
                  className={
                    role === "USER" ? `ml-7 font-bold text-secondary-heavy` : `ml-7 font-bold text-primary-normal`
                  }
                >
                  1순위
                </span>
                <span className={role === "USER" ? `ml-7 text-secondary-heavy` : `ml-7 text-primary-normal`}>
                  {candidateTime1}
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={
                    role === "USER" ? `ml-7 font-bold text-secondary-heavy` : `ml-7 font-bold text-primary-normal`
                  }
                >
                  2순위
                </span>
                <span className={role === "USER" ? `ml-7 text-secondary-heavy` : `ml-7 text-primary-normal`}>
                  {candidateTime2}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mb-4 flex flex-col border-b-1 pb-4">
        <div className="flex justify-between">
          <span className="font-bold">상담 방식</span>
          <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>
            {type === "VISIT" ? "방문상담" : "유선상담"}
          </span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="font-bold">미팅 장소</span>
          <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>{location}</span>
        </div>
        <LocationCopyButton location={locationAddress} />
      </div>
      <div>
        <div className="flex justify-between">
          <span className="font-bold">상담목적</span>
          <span className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>{goal}</span>
        </div>
        <div className="flex flex-col">
          <span className="mt-2 font-bold">요청사항</span>
          <p className="mt-2 rounded-sm bg-background-secondary p-4">{question}</p>
        </div>
        <div className="flex flex-col items-center py-6 text-xs">
          <p className={role === "USER" ? `font-bold text-secondary-heavy` : `font-bold text-primary-normal`}>
            {completionPhrase1}
          </p>
          <p className={role === "USER" ? `text-secondary-heavy` : `text-primary-normal`}>{completionPhrase2}</p>
        </div>
      </div>
    </section>
  );
}

export default ConsultingHistoryCard;
