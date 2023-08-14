import { InputFormType } from "@/constants/enum";
import SingleInputForm from "../common/SingleInputForm";

function EnterInformation() {
  return (
    <>
      <p className="mb-10 mt-14 text-xl font-bold leading-7">가입할 때 등록한 정보를 입력해주세요.</p>
      <SingleInputForm type={InputFormType.FIND_PASSWORD} />
    </>
  );
}

export default EnterInformation;
