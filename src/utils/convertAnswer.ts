import reservationQuestions from "@/constants/reservationQuestions.json";
import propensityQuestions from "@/constants/propensityCheckQuestions.json";
import { IAnswers, IQuestions } from "@/types/reservation";
import { ReservationGoal, ReservationType, ReservationLocationType } from "@/constants/enum";
import { IAnalysisAnswers, IAnalysisQuestions } from "@/types/analysis";

const reservationGoal = [
  ReservationGoal.PROFIT,
  ReservationGoal.RISK,
  ReservationGoal.TAX,
  ReservationGoal.PRESERVATION,
];
const reservationType = [ReservationType.VISIT, ReservationType.CALL];
const reservationLocationType = [ReservationLocationType.BRANCH, ReservationLocationType.CALL];

const scoreArr = [
  [5, 4, 3, 2],
  [4, 3, 2],
  [5, 4, 3, 1],
  [5, 4, 3, 1],
  [5, 4, 3, 2],
  [5, 4, 2, 1],
];
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
    candidateTime1: convertedAnswers[3].candidateTime1,
    candidateTime2: convertedAnswers[3].candidateTime2,
    question: convertedAnswers[4],
    userName: convertedAnswers[5].userName,
    userPhoneNumber: convertedAnswers[5].userPhoneNumber,
    userEmail: convertedAnswers[5].userEmail,
  };
  return arrangedAnswers;
};

export const convertAnalysisAnswers = (answers: IAnalysisAnswers) => {
  const questions: IAnalysisQuestions = propensityQuestions;
  const answersArr = Object.values(answers);
  const convertedAnswers = answersArr.map((answer, index) => {
    const ansIndex = questions[index].options.indexOf(answer);
    return scoreArr[index][ansIndex];
  });
  return convertedAnswers;
};
