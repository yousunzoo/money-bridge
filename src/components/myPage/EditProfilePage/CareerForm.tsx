import { ICareerFormProps } from "@/types/my";
import minusIcon from "/public/assets/images/minusCircle.svg";

import Image from "next/image";
function CareerForm({ career, removeItems, register, index }: ICareerFormProps) {
  const { content, start, end, id } = career;

  const handleClick = () => {
    if (!id) return;
    removeItems("career", id);
  };
  return (
    <li className="relative mb-4 rounded-sm bg-white p-4 shadow-md">
      <button onClick={handleClick} type="button" className="absolute -right-[12px] -top-[14px]">
        <Image src={minusIcon} alt="삭제" width={28} height={28} />
      </button>
      <input
        className="edit_input mb-4 flex-1"
        placeholder="경력을 작성해주세요."
        defaultValue={content}
        required
        {...register(`careers-${id}-content`)}
      />
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-1/2">
          <p className="text-sm">입사</p>
          <input
            type="number"
            className="mt-2 w-full rounded-md border-1 border-button-inactive px-4 py-3 shadow-sm"
            placeholder="입사년도"
            defaultValue={start}
            required
            pattern="[0-9]{4}"
            {...register(`careers-${id}-start`)}
          />
        </div>
        <p className="pt-8">~</p>
        <div className="relative w-1/2">
          <p className="text-sm">퇴사</p>
          <input
            type="number"
            className="mt-2 w-full rounded-md border-1 border-button-inactive px-4 py-3 shadow-sm"
            placeholder="퇴사년도"
            defaultValue={end}
            pattern="[0-9]{4}"
            required
            {...register(`careers-${id}-end`)}
          />
        </div>
      </div>
    </li>
  );
}

export default CareerForm;
