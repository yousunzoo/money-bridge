import DoubleInputForm from "@/components/common/DoubleInputForm";
import { InputFormType } from "@/constants/enum";

function EnterInformation() {
  return (
    <>
      <p className="mb-10 mt-14 text-xl font-bold leading-7">가입할 때 등록한 정보를 입력해 주세요.</p>
      <DoubleInputForm type={InputFormType.FIND_EMAIL} />
    </>
  );
}

export default EnterInformation;
