"use client";
import { FormEvent, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputFormType } from "@/constants/enum";
import { usePathname } from "next/navigation";
import { useFindEmail } from "@/hooks/useFindEmail";
import ButtonModal from "./ButtonModal";
import Image from "next/image";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";
import { usePasswordAuthentication } from "@/hooks/usePasswordAuthentication";
import { yup_email, yup_phone } from "@/constants/yupSchema";
import { useSetModalContent } from "@/hooks/useSetModalContent";

function SingleInputForm({ type }: { type: InputFormType }) {
  const pathName = usePathname();
  const { isOpen, modalContent, modalSubContent, setIsOpen, setModalContent, setModalSubContent } =
    useSetModalContent();

  const authentication = usePasswordAuthentication(setIsOpen, setModalContent, setModalSubContent);
  const findEmail = useFindEmail(setIsOpen, setModalContent);

  const inputType = type === InputFormType.LOGIN ? "password" : "text";

  const schema = yup.object().shape({
    first: type === InputFormType.FIND_EMAIL ? yup_phone : yup_email,
  });
  const {
    register,
    formState: { errors, isValid, dirtyFields },
    resetField,
    getValues,
  } = useForm({ mode: "all", resolver: yupResolver(schema), defaultValues: { first: "" } });

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    const inputEl = button.previousElementSibling as HTMLInputElement;
    resetField(inputEl.name as "first", { defaultValue: "" });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    switch (type) {
      case InputFormType.FIND_EMAIL:
        findEmail({
          phoneNumber: getValues("first"),
          role: pathName.split("/")[2].toUpperCase(),
        });
        break;
      case InputFormType.FIND_PASSWORD:
        authentication({
          email: getValues("first"),
          role: pathName.split("/")[2].toUpperCase(),
        });
        break;
    }
  };
  console.log(isValid);
  errors.first?.type === "required" ? (errors.first = undefined) : "";
  errors.first?.type === "min" ? (errors.first.ref?.value === "" ? (errors.first = undefined) : "") : "";

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit}>
        <div className="mb-2.5">
          <h2 className="mb-4 mt-6 text-sm font-bold leading-5">{getNotice(type)?.data.header1}</h2>
          <div className="relative flex items-center">
            <input
              type={inputType}
              className={`form_input ${errors.first ? "warnning" : ""} ${dirtyFields.first ? "entering" : ""}`}
              {...register("first")}
            />
            {dirtyFields.first && (
              <>
                <button
                  type="button"
                  className="input_button bg-[url('/assets/images/clear.svg')]"
                  tabIndex={-1}
                  onClick={handleClear}
                ></button>
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
        <ButtonModal modalContents={modalContent} isOpen={isOpen} setIsOpen={setIsOpen}>
          <p>{modalSubContent}</p>
        </ButtonModal>
      )}
    </div>
  );
}

export default SingleInputForm;

const getNotice = (type: InputFormType) => {
  switch (type) {
    case InputFormType.FIND_EMAIL:
      return {
        data: {
          header1: "휴대폰 번호",
          notice1: "-자 없이 숫자로만 적어주세요",
          submit: "확인",
          func: "",
        },
      };
    case InputFormType.FIND_PASSWORD:
      return {
        data: {
          header1: "이메일",
          notice1: "@를 포함하여 작성해주세요.",
          submit: "인증코드 받기",
          func: "",
        },
      };
  }
};
