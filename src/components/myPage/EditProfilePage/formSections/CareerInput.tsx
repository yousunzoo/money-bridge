import { ICareerInputProps } from "@/types/editProfile";

function CareerInput({ errors, register, defaultValue }: ICareerInputProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">총 경력을 입력해주세요.</p>
      <div className="mb-2 flex items-center">
        <input
          className={`edit_input flex-1 ${errors["career"] && "warnning"}`}
          type="number"
          placeholder="햇수를 입력해주세요."
          defaultValue={defaultValue}
          {...register("career", {
            required: true,
            max: 100,
          })}
        />
        <span className="ml-4 w-[110px] text-xl font-bold">년</span>
      </div>
      <p className={`text-xs ${errors["career"] ? "text-status-error" : "text-gray-normal"}`}>
        경력은 2자리 이하의 숫자로 입력해주세요
      </p>
    </section>
  );
}

export default CareerInput;
