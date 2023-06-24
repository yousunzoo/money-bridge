import { ICareerInputProps } from "@/types/editProfile";

function CareerInput({ register, defaultValue }: ICareerInputProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">총 경력을 입력해주세요.</p>
      <div className="flex items-center">
        <input
          className="edit_input flex-1"
          type="number"
          max={100}
          placeholder="햇수를 입력해주세요."
          defaultValue={defaultValue}
          {...register("career")}
        />
        <span className="ml-4 w-[110px] text-xl font-bold">년</span>
      </div>
    </section>
  );
}

export default CareerInput;
