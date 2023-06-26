import { ICareerFormProps } from "@/types/editProfile";
import minusIcon from "/public/assets/images/minusCircle.svg";

import Image from "next/image";
function CareerForm({ errors, careerData, removeItems, register }: ICareerFormProps) {
  const { career, start, end, id } = careerData;
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
        className={`edit_input mb-4 flex-1 ${errors[`careers-${id}-career`] && "warnning"}`}
        placeholder="경력을 작성해주세요."
        defaultValue={career}
        {...register(`careers-${id}-career`, {
          required: true,
        })}
      />
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-1/2">
          <p className="text-sm">입사</p>
          <input
            type="number"
            className={`edit_input mt-2 ${errors[`careers-${id}-start`] && "warnning"}`}
            placeholder="입사년도"
            defaultValue={start}
            {...register(`careers-${id}-start`, {
              required: true,
              pattern: /^[12]\d{3}$/,
            })}
          />
        </div>
        <p className="pt-8">~</p>
        <div className="relative w-1/2">
          <p className="text-sm">퇴사</p>
          <input
            type="number"
            className={`edit_input mt-2 ${errors[`careers-${id}-end`] && "warnning"}`}
            placeholder="퇴사년도"
            defaultValue={end}
            {...register(`careers-${id}-end`, {
              required: true,
              pattern: /^[12]\d{3}$/,
            })}
          />
        </div>
      </div>
    </li>
  );
}

export default CareerForm;
