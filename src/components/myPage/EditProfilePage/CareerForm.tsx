import { ICareerFormProps } from "@/types/editProfile";
import minusIcon from "/public/assets/images/minusCircle.svg";

import Image from "next/image";
function CareerForm({ errors, getValues, careerData, removeItems, register }: ICareerFormProps) {
  const { career, start, end, id } = careerData;
  const handleClick = () => {
    if (!id) return;
    removeItems("career", id);
  };

  const validateStartEndDates = () => {
    const startYear = parseInt(getValues(`careers-${id}-start`));
    const endYear = parseInt(getValues(`careers-${id}-end`));
    if (startYear && endYear && startYear > endYear) {
      return false;
    }
    return true;
  };

  return (
    <li className="relative mb-4 rounded-sm bg-white p-4 shadow-md">
      <button onClick={handleClick} type="button" className="absolute -right-[12px] -top-[14px]">
        <Image src={minusIcon} alt="삭제" width={28} height={28} />
      </button>
      <div className="relative pb-8">
        <input
          className={`edit_input flex-1 ${errors[`careers-${id}-career`] && "warnning"}`}
          placeholder="경력을 작성해주세요."
          defaultValue={career}
          {...register(`careers-${id}-career`, {
            required: true,
          })}
        />
        {errors[`careers-${id}-career`] && (
          <p className={"absolute bottom-0 mb-2 text-xs text-status-error"}>경력 명은 필수 입력 사항입니다.</p>
        )}
      </div>
      <div className="relative flex items-center justify-between gap-4 pb-6">
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
              validate: validateStartEndDates,
            })}
          />
        </div>
        {(errors[`careers-${id}-start`] || errors[`careers-${id}-end`]) && (
          <p className={"absolute bottom-0 text-xs text-status-error"}>
            {validateStartEndDates()
              ? "연도는 4자리의 숫자로 작성해주세요."
              : "퇴사년도는 입사년도보다 이전이여서는 안됩니다."}
          </p>
        )}
      </div>
    </li>
  );
}

export default CareerForm;
