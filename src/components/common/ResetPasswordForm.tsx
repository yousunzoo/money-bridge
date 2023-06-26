"use client";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useQueryClient } from "@tanstack/react-query";
import { IFindPassword } from "@/types/login";
import ButtonModal from "./ButtonModal";
import { yup_password } from "@/constants/yupSchema";
import Image from "next/image";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";
import { useMyPageCheck } from "@/hooks/useMyPageCheck";

type Tinput = "first" | "second";

function ResetPasswordForm() {
  const router = useRouter();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = pathName.split("/")[1];
  const { loginedUserInfo } = useMyPageCheck(currentPath === "my");
  const findPassword = useResetPassword();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    first: yup_password,
    second: yup.string().oneOf([yup.ref("first")]),
  });

  const modalContents = {
    content: "비밀번호가 재설정 되었습니다.",
    confirmText: currentPath === "findPassword" ? "로그인" : "확인",
    confirmFn: () => {
      setIsOpen(false);
      currentPath === "findPassword" ? router.push("/login") : router.back();
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    resetField,
    getValues,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema), defaultValues: { first: "", second: "" } });

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    const inputEl = button.previousElementSibling as HTMLInputElement;
    resetField(inputEl.name as Tinput, { defaultValue: "" });
  };

  const onSubmit = () => {
    switch (currentPath) {
      case "findPassword":
        const data = queryClient.getQueryData(["findPassword"]) as IFindPassword;
        findPassword({ id: data.data.id, password: getValues("first"), role: pathName.split("/")[2].toUpperCase() });
        break;
      case "my":
        if (!loginedUserInfo) return;
        findPassword({ id: loginedUserInfo.id, password: getValues("first"), role: loginedUserInfo.role });
    }
    setIsOpen(true);
  };

  errors.first?.type === "required" ? (errors.first = undefined) : "";
  errors.first?.type === "min" ? (errors.first.ref?.value === "" ? (errors.first = undefined) : "") : "";
  errors.second?.type === "required" ? (errors.second = undefined) : "";
  errors.second?.type === "min" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";
  errors.second?.type === "oneOf" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2.5">
          <h2 className="mb-4 text-xs leading-[18px]">기존과 다른 비밀번호를 입력해 주세요.</h2>
          <div className="relative flex items-center">
            <input
              type="password"
              className={`form_input ${errors.first ? "warnning" : ""} ${dirtyFields.first ? "entering" : ""}`}
              {...register("first")}
            />
            {dirtyFields.first && (
              <>
                <button type="button" className="input_button" tabIndex={-1} onClick={handleClear}></button>
                <Image src={errors.first ? alert : correct} alt="input_status" className="input_status" />
              </>
            )}
          </div>
          <div className="mt-0.5 h-[18px] pl-2">
            <p className={`text-xs leading-[18px] ${errors.first ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.first ? "*영문(대소문자), 숫자 포함하여 8자 이상으로 작성해 주세요." : ""}
            </p>
            <p
              className={`text-xs leading-[18px] ${
                getValues("first").includes(" ") ? "text-status-alert" : "text-status-positive"
              }`}
            >
              {dirtyFields.first ? "*공백없이 작성해 주세요." : ""}
            </p>
          </div>
        </div>
        <div className="mb-2.5">
          <h2 className="mb-4 mt-6 text-xs leading-[18px]">다시 한 번 입력해 주세요</h2>
          <div className="relative flex items-center">
            <input
              type="password"
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
              {dirtyFields.second ? "동일한 비밀번호를 입력해 주세요" : ""}
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
          <span className={`text-xl font-bold leading-7 ${isValid ? "text-white" : "text-gray-heavy"}`}>확인</span>
        </button>
      </form>
      {isOpen && (
        <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen}>
          {currentPath === "findPassword" && <p>로그인 후 MONEY BRIDGE를 이용해주세요.</p>}
        </ButtonModal>
      )}
    </div>
  );
}

export default ResetPasswordForm;
