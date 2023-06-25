import Image from "next/image";
import AddIcon from "/public/assets/images/addCircle.svg";
import CareerForm from "../CareerForm";
import { ICareersInputProps } from "@/types/editProfile";

function CareersInput({ errors, register, removeItems, careers, addCareers }: ICareersInputProps) {
  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xl font-bold">세부 경력을 입력해주세요.</p>
        <button type="button" onClick={addCareers}>
          <Image src={AddIcon} alt="경력 추가하기" width={36} height={36} />
        </button>
      </div>
      <p className="mb-4 text-xs">재직 중일 시 퇴사에 현재 연도를 입력해주세요.</p>
      <ul className="px-4">
        {careers.map(item => (
          <CareerForm key={item.id} errors={errors} register={register} removeItems={removeItems} career={item} />
        ))}
      </ul>
    </section>
  );
}

export default CareersInput;
