import Image from "next/image";
import minusIcon from "/public/assets/images/minusCircle.svg";
import { IAwardFormProps } from "@/types/editProfile";

function AwardForm({ award, removeItems, register }: IAwardFormProps) {
  const { record, awardYear, id } = award;
  const handleClick = () => {
    if (!id) return;
    removeItems("award", id);
  };
  return (
    <li className="relative mb-4 rounded-sm bg-white p-4 shadow-md">
      <button onClick={handleClick} type="button" className="absolute -right-[12px] -top-[14px]">
        <Image src={minusIcon} alt="삭제" width={28} height={28} />
      </button>
      <input
        className="edit_input mb-4 flex-1"
        placeholder="수상 내역을 작성해주세요."
        defaultValue={record}
        required
        {...register(`award-${id}-content`)}
      />
      <div className="flex items-center justify-between gap-4 pr-8">
        <div className="relative w-1/2">
          <p className="text-sm">수상년도</p>
          <input
            type="number"
            className="mt-2 w-full rounded-md border-1 border-button-inactive px-4 py-3 shadow-sm"
            placeholder="수상년도"
            defaultValue={awardYear}
            required
            pattern="[0-9]{4}"
            {...register(`award-${id}-awardYear`)}
          />
        </div>
      </div>
    </li>
  );
}

export default AwardForm;
