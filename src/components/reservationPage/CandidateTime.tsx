import { ICandidateTimeProps } from "@/types/reservation";
import dayjs from "dayjs";

function CandidateTime({ candidates }: ICandidateTimeProps) {
  const { candidateTime1, candidateTime2 } = candidates;
  const time1 = dayjs(candidateTime1).format("YYYY년 MM월 DD일 dddd/A HH:mm").split("/");
  const time2 = dayjs(candidateTime2).format("YYYY년 MM월 DD일 dddd/A HH:mm").split("/");

  return (
    <div className="userBubble text-right">
      <div className="mb-4">
        <p>1순위</p>
        <p>날짜 : {time1[0]}</p>
        <p>시간 : {time1[1]}</p>
      </div>
      <div>
        <p>2순위</p>
        <p>날짜 : {time2[0]}</p>
        <p>시간 : {time2[1]}</p>
      </div>
    </div>
  );
}

export default CandidateTime;
