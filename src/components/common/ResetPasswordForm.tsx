"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useQueryClient } from "@tanstack/react-query";
import { IFindPassword } from "@/types/login";
import ButtonModal from "./ButtonModal";
import { yup_password } from "@/constants/yupSchema";

function ResetPasswordForm() {
  const router = useRouter();
  const pathName = usePathname();
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const findPassword = useResetPassword();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    first: yup_password,
    second: yup.string().oneOf([yup.ref("first")]),
  });

  const modalContents = {
    content: "비밀번호가 재설정 되었습니다.",
    confirmText: "로그인",
    confirmFn: () => {
      setIsOpen(false);
      router.push("/login");
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema), defaultValues: { first: "", second: "" } });

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const currentPath = pathName.split("/")[1];
    switch (currentPath) {
      case "findPassword":
        const data = queryClient.getQueryData(["findPassword"]) as IFindPassword;
        findPassword({ id: data.data.id, password: inputs.first, role: pathName.split("/")[2].toUpperCase() });
        setIsOpen(true);
    }
  };

  errors.first?.type === "required" ? (errors.first = undefined) : "";
  errors.first?.type === "min" ? (errors.first.ref?.value === "" ? (errors.first = undefined) : "") : "";
  errors.second?.type === "required" ? (errors.second = undefined) : "";
  errors.second?.type === "min" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";
  errors.second?.type === "oneOf" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
        <div className="mb-2.5">
          <h2 className="mb-4 text-xs leading-[18px]">기존과 다른 비밀번호를 입력해 주세요.</h2>
          <input
            type="password"
            className={`form_input ${errors.first ? "warnning" : ""} ${dirtyFields.first ? "entering" : ""}`}
            {...register("first")}
            value={inputs.first}
          />
          <div className="mt-0.5 h-[18px] pl-2">
            <p className={`text-xs leading-[18px] ${errors.first ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.first ? "*영문(대소문자), 숫자 포함하여 8자 이상으로 작성해 주세요." : ""}
            </p>
            <p
              className={`text-xs leading-[18px] ${
                inputs.first.includes(" ") ? "text-status-alert" : "text-status-positive"
              }`}
            >
              {dirtyFields.first ? "*공백없이 작성해 주세요." : ""}
            </p>
          </div>
        </div>
        <div className="mb-2.5">
          <h2 className="mb-4 mt-6 text-xs leading-[18px]">다시 한 번 입력해 주세요</h2>
          <input
            type="password"
            className={`form_input ${errors.second ? "warnning" : ""} ${dirtyFields.second ? "entering" : ""}`}
            {...register("second")}
            value={inputs.second}
          />
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
          <p>로그인 후 MONEY BRIDGE를 이용해주세요.</p>
        </ButtonModal>
      )}
    </div>
  );
}

export default ResetPasswordForm;
