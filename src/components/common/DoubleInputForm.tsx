"use client";
import React, { FormEvent, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputFormType } from "@/constants/enum";
import { usePathname, useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useFindEmail } from "@/hooks/useFindEmail";
import ButtonModal from "./ButtonModal";
import Image from "next/image";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";
import { usePasswordAuthentication } from "@/hooks/usePasswordAuthentication";
import { yup_email, yup_name, yup_password, yup_phone } from "@/constants/yupSchema";

type Tinput = "first" | "second";

function DoubleInputForm({
  type,
  setNextStep,
}: {
  type: InputFormType;
  setNextStep?: (value: React.SetStateAction<boolean>) => void;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [modalError, setModalError] = useState(false);

  const login = useLogin(setNextStep, setIsOpen, setModalError);
  console.log("on submit??");

  const authentication = usePasswordAuthentication(setIsOpen, setModalError);
  const findEmail = useFindEmail(setIsOpen, setModalError);
  const inputType = type === InputFormType.LOGIN ? "password" : "text";

  const modalContents_NotExist = {
    content: "사용자가 존재하지 않습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsOpen(false);
    },
  };

  const modalContents_Success = {
    content: "인증코드가 발송되었습니다.",
    confirmText: "확인",
    confirmFn: () => {
      setIsOpen(false);
      if (type === InputFormType.FIND_PASSWORD) {
        router.push(`/findPassword/${pathName.split("/")[2]}/authentication`);
      }
    },
  };

  const schema = yup.object().shape({
    first: type === InputFormType.LOGIN ? yup_email : yup_name,
    second: type === InputFormType.LOGIN ? yup_password : type === InputFormType.FIND_EMAIL ? yup_phone : yup_email,
  });

  const {
    register,
    formState: { errors, isValid, dirtyFields },
    resetField,
    getValues,
  } = useForm({ mode: "all", resolver: yupResolver(schema), defaultValues: { first: "", second: "" } });

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    const inputEl = button.previousElementSibling as HTMLInputElement;
    resetField(inputEl.name as Tinput, { defaultValue: "" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    switch (type) {
      case InputFormType.LOGIN:
        login({ email: getValues("first"), password: getValues("second"), role: pathName.split("/")[2].toUpperCase() });
        console.log("on submit");
        break;
      case InputFormType.FIND_EMAIL:
        findEmail({
          name: getValues("first"),
          phoneNumber: getValues("second"),
          role: pathName.split("/")[2].toUpperCase(),
        });
        break;
      case InputFormType.FIND_PASSWORD:
        authentication({
          name: getValues("first"),
          email: getValues("second"),
          role: pathName.split("/")[2].toUpperCase(),
        });
        break;
    }
  };

  errors.first?.type === "required" ? (errors.first = undefined) : "";
  errors.first?.type === "min" ? (errors.first.ref?.value === "" ? (errors.first = undefined) : "") : "";
  errors.second?.type === "required" ? (errors.second = undefined) : "";
  errors.second?.type === "min" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit}>
        <div className="mb-2.5">
          <h2 className="mb-4 text-sm font-bold leading-5">{getNotice(type)?.data.header1}</h2>
          <div className="relative flex items-center">
            <input
              type="text"
              className={`form_input ${errors.first ? "warnning" : dirtyFields.first ? "entering" : ""} `}
              {...register("first")}
              autoFocus
            />
            {dirtyFields.first && (
              <>
                <button type="button" className="input_button" tabIndex={-1} onClick={handleClear}></button>
                <Image src={errors.first ? alert : correct} alt="input_status" className="input_status" />
              </>
            )}
          </div>
          <div className="h-[18px] pl-2">
            <span className={`text-xs leading-[18px] ${errors.first ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.first ? getNotice(type)?.data.notice1 : ""}
            </span>
          </div>
        </div>
        <div className="mb-2.5">
          <h2 className="mb-4 mt-6 text-sm font-bold leading-5">{getNotice(type)?.data.header2}</h2>
          <div className="relative flex items-center">
            <input
              type={inputType}
              className={`form_input ${errors.second ? "warnning" : ""} ${dirtyFields.second ? "entering" : ""}`}
              {...register("second")}
            />
            {dirtyFields.second && (
              <>
                <button type="button" className="input_button" tabIndex={-1} onClick={handleClear}></button>
                <Image src={errors.second ? alert : correct} alt="input_status" className="input_status" />
              </>
            )}
          </div>
          <div className="h-[18px] pl-2">
            <span className={`text-xs leading-[18px] ${errors.second ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.second ? getNotice(type)?.data.notice2 : ""}
            </span>
          </div>
        </div>
        <button
          className={`mt-4 h-14 w-full rounded-[8px] ${isValid ? "bg-primary-normal" : "bg-background-disabled"} ${
            isValid ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={onSubmit}
          disabled={!isValid}
        >
          <span className={`text-xl font-bold leading-7 ${isValid ? "text-white" : "text-gray-heavy"}`}>
            {getNotice(type)?.data.submit}
          </span>
        </button>
      </form>
      {isOpen && (
        <ButtonModal
          modalContents={modalError ? modalContents_NotExist : modalContents_Success}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <p>정보를 확인해 주세요.</p>
        </ButtonModal>
      )}
    </div>
  );
}

export default DoubleInputForm;

const getNotice = (type: InputFormType) => {
  switch (type) {
    case InputFormType.LOGIN:
      return {
        data: {
          header1: "이메일",
          header2: "비밀번호",
          notice1: "@를 포함하여 작성해 주세요.",
          notice2: "8자 이상 입력해 주세요.",
          submit: "로그인",
          func: "",
        },
      };
    case InputFormType.FIND_EMAIL:
      return {
        data: {
          header1: "이름",
          header2: "휴대폰 번호",
          notice1: "",
          notice2: "-자 없이 숫자로만 적어주세요",
          submit: "확인",
          func: "",
        },
      };
    case InputFormType.FIND_PASSWORD:
      return {
        data: {
          header1: "이름",
          header2: "이메일",
          notice1: "",
          notice2: "@를 포함하여 작성해 주세요.",
          submit: "인증코드 받기",
          func: "",
        },
      };
  }
};
