import DoubleInputForm from "@/components/common/DoubleInputForm";
import { InputFormType } from "@/constants/enum";

function EnterInformation() {
  return (
    <>
      <p className="mb-[40px] mt-[56px] text-[20px] font-bold leading-[28px]">가입할 때 등록한 정보를 입력해 주세요.</p>
      <DoubleInputForm type={InputFormType.FIND_PASSWORD} />
    </>
  );
}

export default EnterInformation;
