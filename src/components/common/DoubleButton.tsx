interface DoubleButtonProps {
  firstTitle: string;
  secondTitle: string;
  role: string;
  reviewCheck?: Boolean;
  firstClickFunc: () => void;
  secondClickFunc: () => void;
}

function DoubleButton({
  role,
  firstTitle,
  secondTitle,
  reviewCheck,
  firstClickFunc,
  secondClickFunc,
}: DoubleButtonProps) {
  return (
    <div className="mt-auto flex justify-between gap-2 pt-6">
      <button
        onClick={firstClickFunc}
        className={`${
          role === "USER"
            ? "border-1 border-secondary-heavy text-secondary-heavy "
            : "border-1 border-primary-normal text-primary-normal"
        } h-14 w-full rounded-md bg-white text-base font-bold`}
      >
        {firstTitle}
      </button>
      <button
        onClick={secondClickFunc}
        className={`${
          role === "USER" ? "bg-secondary-heavy text-white" : "bg-primary-normal text-white"
        } h-14 w-full rounded-md text-base font-bold `}
      >
        {reviewCheck ? "나의 후기" : secondTitle}
      </button>
    </div>
  );
}

export default DoubleButton;
