import { JoinFormType } from "@/constants/enum";
import { yup_email, yup_name, yup_phone } from "@/constants/yupSchema";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useJoinStore } from "@/store/joinStore";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";
import { FormEvent } from "react";
import ButtonModal from "@/components/common/ButtonModal";
import { useSetModalContent } from "@/hooks/useSetModalContent";

function JoinInformation({ type }: { type: JoinFormType }) {
  const router = useRouter();
  const pathName = usePathname();
  const joinType = pathName.split("/")[2];

  const { isOpen, modalContent, modalSubContent, setIsOpen, setModalContent, setModalSubContent } =
    useSetModalContent();

  const authentication = useAuthentication(setIsOpen, setModalContent, setModalSubContent);
  const { setInformations } = useJoinStore();

  const schema = yup.object().shape({
    text: type === JoinFormType.EMAIL ? yup_email : type === JoinFormType.NAME ? yup_name : yup_phone,
  });

  const {
    register,
    formState: { errors, isValid, dirtyFields },
    getValues,
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema), defaultValues: { text: "" } });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const currentPath = pathName.split("/")[3];

    setInformations(currentPath, getValues("text"));
    switch (type) {
      case JoinFormType.EMAIL:
        authentication({ email: getValues("text"), role: joinType.toUpperCase() });
        break;
      case JoinFormType.NAME:
        router.push(`/join/${joinType}/phoneNumber`);
        break;
      case JoinFormType.PHONENUMBER:
        router.push(`/join/${joinType}/${joinType === "user" ? "agreements" : "selectCompany"}`);
        break;
    }
  };

  errors.text?.type === "required" ? (errors.text = undefined) : "";
  errors.text?.type === "matches" ? (errors.text.ref?.value === "" ? (errors.text = undefined) : "") : "";

  return (
    <>
      <p className="my-14 text-xl font-bold leading-7">{joinStepRenderer[type].title}</p>
      <p className="mb-2 text-xs leading-[18px]">{joinStepRenderer[type].sub}</p>
      <form onSubmit={onSubmit}>
        <div className="relative flex items-center">
          <input
            autoFocus
            type={`${type === JoinFormType.PHONENUMBER ? "number" : "text"}`}
            className={`form_input ${errors.text ? "warnning" : dirtyFields.text ? "entering" : ""} `}
            {...register("text")}
          />
          {dirtyFields.text && (
            <>
              <button
                type="button"
                className="input_button  bg-[url('/assets/images/clear.svg')]"
                tabIndex={-1}
                onClick={() => reset()}
              ></button>
              <Image src={errors.text ? alert : correct} alt="input_status" className="input_status" />
            </>
          )}
        </div>
        <div className="h-[18px] pl-2">
          <span className={`text-xs leading-[18px] ${errors.text ? "text-status-alert" : "text-status-positive"}`}>
            {dirtyFields.text ? joinStepRenderer[type].validation : ""}
          </span>
        </div>
        <button
          className={`mt-[150px] h-14 w-full rounded-[8px] ${isValid ? "bg-primary-normal" : "bg-background-disabled"}`}
          disabled={!isValid}
        >
          <span className={`text-xl font-bold leading-7 ${isValid ? "text-white" : "text-gray-heavy"}`}>
            {type === JoinFormType.EMAIL ? "인증코드 받기" : "다음"}
          </span>
        </button>
      </form>
      {isOpen && (
        <ButtonModal modalContents={modalContent} isOpen={isOpen} setIsOpen={setIsOpen}>
          <p>{modalSubContent}</p>
        </ButtonModal>
      )}
    </>
  );
}

export default JoinInformation;

interface IStepRenderer {
  title: string;
  sub?: string;
  validation?: string;
}

interface IJoinStepRenderer {
  [key: string]: IStepRenderer;
}

const joinStepRenderer: IJoinStepRenderer = {
  EMAIL: {
    title: "이메일을 입력해주세요",
    sub: "이메일은 수정이 불가함으로 신중하게 적어주세요.",
    validation: "@를 포함하여 작성해주세요.",
  },
  NAME: {
    title: "이름을 입력해주세요",
  },
  PHONENUMBER: {
    title: "휴대폰번호를 입력해주세요",
    validation: "‘-’ 없이 숫자만 입력해주세요.",
  },
};
