import { IConvertedAnswers } from "./../types/analysis";
import reservationQuestions from "@/constants/reservationQuestions.json";
import propensityQuestions from "@/constants/propensityCheckQuestions.json";
import { IAnswers, IQuestions } from "@/types/reservation";
import { ReservationGoal, ReservationType, ReservationLocationType } from "@/constants/enum";
import { IAnalysisAnswers, IAnalysisQuestions, IValidateConvertedAnswers } from "@/types/analysis";

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

export const convertReservationAnswer = (answers: IAnswers): IConvertedAnswers => {
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
    goal: convertedAnswers[0],
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

export const validateReservationAnswers = (answers: IAnswers) => {
  if (!answers[5]) return false;
  const convertedAnswers = convertReservationAnswer(answers);
  return convertedAnswers.reservationType === "VISIT" && convertedAnswers.locationType === null ? false : true;
};

export const convertAnalysisAnswers = (answers: IAnalysisAnswers) => {
  const questions: IAnalysisQuestions = propensityQuestions;
  const answersArr = Object.values(answers);

  const ScoreSummation = answersArr.reduce((acc, value, index) => {
    const ansIndex = questions[index].options.indexOf(value);

    return acc + scoreArr[index][ansIndex];
  }, 0);

  return ScoreSummation;
};
