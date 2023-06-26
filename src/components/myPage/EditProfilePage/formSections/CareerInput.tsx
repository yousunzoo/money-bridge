import { ICareerInputProps } from "@/types/editProfile";

function CareerInput({ errors, register, defaultValue }: ICareerInputProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">총 경력을 입력해주세요.</p>
      <div className="flex items-center">
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
    </section>
  );
}

export default CareerInput;
