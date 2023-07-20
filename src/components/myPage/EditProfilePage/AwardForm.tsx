import Image from "next/image";
import minusIcon from "/public/assets/images/minusCircle.svg";
import { IAwardFormProps } from "@/types/editProfile";
import { useFormContext } from "react-hook-form";

function AwardForm({ award, removeItems }: IAwardFormProps) {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { record, year, id } = award;

  const handleClick = () => {
    if (!id) return;
    removeItems("award", id);
  };
  return (
    <li className="relative mb-4 rounded-sm bg-white p-4 shadow-md">
      <button onClick={handleClick} type="button" className="absolute -right-[12px] -top-[14px]">
        <Image src={minusIcon} alt="삭제" width={28} height={28} />
      </button>
      <div className="relative pb-8">
        <input
          className={`edit_input flex-1 ${errors[`award-${id}-record`] && "warnning"}`}
          placeholder="수상 내역을 작성해주세요."
          defaultValue={record}
          {...register(`award-${id}-record`, {
            required: true,
          })}
        />
        {errors[`award-${id}-record`] && (
          <p className="absolute bottom-2 text-xs text-status-error">수상 내역은 필수 입력 사항입니다.</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 pr-8">
        <div className="relative w-1/2 pb-6">
          <p className="mb-2 text-sm">수상년도</p>
          <input
            type="number"
            className={`edit_input ${errors[`award-${id}-awardYear`] && "warnning"}`}
            placeholder="수상년도"
            defaultValue={year}
            pattern="[0-9]{4}"
            {...register(`award-${id}-awardYear`, {
              required: true,
              pattern: /^[12]\d{3}$/,
            })}
          />
          {errors[`award-${id}-awardYear`] && (
            <p className="absolute bottom-0 text-xs text-status-error">연도는 4자리의 숫자로 작성해주세요.</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default AwardForm;
