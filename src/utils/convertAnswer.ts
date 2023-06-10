import reservationQuestions from "@/constants/reservationQuestions.json";
import { IAnswers, IQuestions } from "@/types/reservation";

const reservationGoal = ["PROFIT", "RISK", "TAX", "PRESERVATION"];
const reservationType = ["VISIT", "CALL"];
const reservationLocationType = ["BRANCH", "CALL"];

export const convertReservationAnswer = (answers: IAnswers) => {
  const questions: IQuestions = reservationQuestions;
  const answersArr = Object.values(answers);
  const OptionsArr = [reservationGoal, reservationType, reservationLocationType];
  const convertedAnswers = answersArr.map((answer, index) => {
    if (index === 3 || index === 5) {
      return answer;
    }

    if (index === 4) {
      return answer === "아니요" ? null : answer;
    }
    const ansIndex = questions[index].options.indexOf(answer);
    const convertedAnswer = OptionsArr[index][ansIndex];
    return convertedAnswer ? convertedAnswer : null;
  });

  const arrangedAnswers = {
    goal1: convertedAnswers[0],
    reservationType: convertedAnswers[1],
    locationType: convertedAnswers[2],
    // 지점명은 api 확정 후 삽입
    // locationName: 미래에셋증권 용산wm점,
    // locationAddress: 서울특별시 용산구 한강로동 한강대로 92,
    candidateTime1: convertedAnswers[3].candidateTime1,
    candidateTime2: convertedAnswers[3].candidateTime2,
    question: convertedAnswers[4],
    userName: convertedAnswers[5].userName,
    userPhoneNumber: convertedAnswers[5].userPhoneNumber,
    userEmail: convertedAnswers[5].userEmail,
  };
  return arrangedAnswers;
};
