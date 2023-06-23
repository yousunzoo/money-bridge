import { ILocationQuestionProps } from "@/types/reservation";
import LocationCopyButton from "@/components/common/LocationCopyButton";
import LocationCard from "@/components/common/LocationCard";
import UserBubble from "../UserBubble/UserBubble";
import { useSetQuestions } from "@/hooks/useSetQuestions";

function LocationQuestion({ pbStation, moveToNextStep }: ILocationQuestionProps) {
  const { nowQuestion, isChoosable, setIsChoosable, sectionRef, answerRef, answers, setAnswers } = useSetQuestions(2);
  const { question, intro1, intro2, options } = nowQuestion;

  const handleClick = (option: string) => {
    setIsChoosable(false);
    setAnswers(2, option);
    moveToNextStep(2);
    return;
  };

  return (
    <section ref={sectionRef} className="flex h-screen flex-col pb-10">
      <div className={`${isChoosable ? "pt-12" : "pt-4"}`} />
      {intro1 && isChoosable && (
        <div className="text-lg mb-10 font-semibold">
          <p>{intro1}</p>
          {intro2 && <p>{intro2}</p>}
        </div>
      )}

      <div className="pb-5">
        <div>
          <p className="text-lg font-bold">{question}</p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <div className="info_card">
            <p className="font-bold text-primary-normal">{pbStation.branchName}</p>
            <div className="mb-4 flex w-full justify-between text-xs">
              <p>{pbStation.branchAddress}</p>
              <LocationCopyButton location={pbStation.branchAddress} />
            </div>
            <LocationCard latitude={pbStation.branchLatitude} longitude={pbStation.branchLongitude} />
          </div>
          {isChoosable &&
            options.map((option, idx) => (
              <button onClick={() => handleClick(option)} className="option" key={idx}>
                {option}
              </button>
            ))}
        </div>
      </div>
      {answers[2] && !isChoosable && (
        <UserBubble answerRef={answerRef} step={2} answers={answers} setIsChoosable={setIsChoosable} />
      )}
    </section>
  );
}

export default LocationQuestion;
