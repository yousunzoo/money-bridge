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
import { FormEvent, useState } from "react";
import ButtonModal from "@/components/common/ButtonModal";
import { useSetModalContent } from "@/hooks/useSetModalContent";
import { useMutation } from "@tanstack/react-query";
import { phoneNumCheck } from "@/app/apis/services/common";

function JoinInformation({ type }: { type: JoinFormType }) {
  const router = useRouter();
  const pathName = usePathname();
  const joinType = pathName.split("/")[2];
  const [isCheck, setIsCheck] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [isReButtonOpen, setIsReButtonOpen] = useState(false);

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

  const currentPath = pathName.split("/")[3];
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

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

  const modalContents = {
    content: "사용 가능한 휴대폰번호 입니다.",
    confirmText: "확인",
  };
  const modalReContents = {
    content: "사용중인 휴대폰번호 입니다.",
    confirmText: "확인",
  };

  const { mutate } = useMutation(phoneNumCheck, {
    onSuccess: data => {
      if (!data.duplicated) {
        setIsCheck(!data.duplicated);
      }
      setIsButtonOpen(!data.duplicated);
      setIsReButtonOpen(data.duplicated);
    },
  });
  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    const phoneNumber = getValues("text");
    const type = pathName.split("/")[2];
    mutate({ phoneNumber, type });
  };
  errors.text?.type === "required" ? (errors.text = undefined) : "";
  errors.text?.type === "matches" ? (errors.text.ref?.value === "" ? (errors.text = undefined) : "") : "";
  return (
    <>
      <p className="text-xl font-bold leading-7 my-14">{joinStepRenderer[type].title}</p>
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
        {currentPath === "phoneNumber" && (
          <button
            onClick={handleCheck}
            className={`mt-4 h-14 w-full rounded-[8px] ${isValid ? "bg-primary-normal" : "bg-background-disabled"}`}
            disabled={!isValid}
          >
            <span className={`text-xl font-bold leading-7 ${isValid ? "text-white" : "text-gray-heavy"}`}>
              휴대폰번호 중복확인
            </span>
          </button>
        )}
        {currentPath === "phoneNumber" ? (
          <button
            className={`mt-[150px] h-14 w-full rounded-[8px] ${
              isValid && isCheck ? "bg-primary-normal" : "bg-background-disabled"
            }`}
            disabled={!isCheck}
          >
            <span className={`text-xl font-bold leading-7 ${isCheck ? "text-white" : "text-gray-heavy"}`}>
              {type === JoinFormType.EMAIL ? "인증코드 받기" : "다음"}
            </span>
          </button>
        ) : (
          <button
            className={`mt-[150px] h-14 w-full rounded-[8px] ${
              isValid ? "bg-primary-normal" : "bg-background-disabled"
            }`}
            disabled={!isValid}
          >
            <span className={`text-xl font-bold leading-7 ${isValid ? "text-white" : "text-gray-heavy"}`}>
              {type === JoinFormType.EMAIL ? "인증코드 받기" : "다음"}
            </span>
          </button>
        )}
      </form>
      {isOpen && (
        <ButtonModal modalContents={modalContent} isOpen={isOpen} setIsOpen={setIsOpen}>
          <p>{modalSubContent}</p>
        </ButtonModal>
      )}

      {isButtonOpen && <ButtonModal modalContents={modalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />}
      {isReButtonOpen && (
        <ButtonModal modalContents={modalReContents} isOpen={isReButtonOpen} setIsOpen={setIsReButtonOpen} />
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
