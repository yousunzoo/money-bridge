import Image from "next/image";
import React from "react";
import arrowbutton from "/public/assets/images/selectArrow.svg";

interface TimePickerButton {
  timeSelect: (e: React.MouseEvent<HTMLElement>) => void;
  selectTime: string;
  isOpenModal: boolean;
}

function TimePickerButton({ timeSelect, selectTime, isOpenModal }: TimePickerButton) {
  const timeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 25; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      options.push(time);
    }
    return options;
  };

  return (
    <button
      onClick={timeSelect}
      className="relative mt-3 flex h-[36px] w-[120px] items-center justify-center gap-4 rounded-md border-1 border-background-secondary px-2 shadow-md"
    >
      <span>{selectTime ? selectTime.slice(0, 5) : "00:00"}</span>
      <Image src={arrowbutton} alt={"arrow"} width={18} height={28} />
      {isOpenModal && (
        <ul className="absolute top-10 h-[200px] w-[120px] overflow-auto rounded-md bg-white p-2 shadow-md">
          {timeOptions().map(time => (
            <li key={time} id={time} className="p-1 pl-4 text-left rounded-md hover:bg-background-normal">
              {time}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

export default TimePickerButton;
