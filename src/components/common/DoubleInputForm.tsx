"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputFormType } from "@/constants/enum";
import { usePathname, useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useFindEmail } from "@/hooks/useFindEmail";

const yup_email = yup.string().required();
const yup_password = yup.string().min(8).max(15).required();
const yup_name = yup.string().min(2).max(10).required();
const yup_phone = yup.string().min(10).max(11).required();

function DoubleInputForm({
  type,
  setNextStep,
}: {
  type: InputFormType;
  setNextStep?: (value: React.SetStateAction<boolean>) => void;
}) {
  const login = useLogin(setNextStep);
  const findEmail = useFindEmail(setNextStep);
  const router = useRouter();
  const pathName = usePathname();
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  const inputType = type === InputFormType.LOGIN ? "password" : "text";

  const schema = yup.object().shape({
    first: type === InputFormType.LOGIN ? yup_email : yup_name,
    second: type === InputFormType.LOGIN ? yup_password : type === InputFormType.FIND_EMAIL ? yup_phone : yup_email,
  });

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

  const onSubmit = async () => {
    if (!isValid) {
      alert("양식을 확인해");
      return;
    }

    switch (type) {
      case InputFormType.LOGIN:
        login({ email: inputs.first, password: inputs.second, role: pathName.split("/")[2].toUpperCase() });
        break;
      case InputFormType.FIND_EMAIL:
        findEmail({ email: inputs.first, phoneNumber: inputs.second, role: pathName.split("/")[2].toUpperCase() });
        break;
      case InputFormType.FIND_PASSWORD:
        router.push(`/findPassword/${pathName.split("/")[2]}/authentication`);
        break;
    }
  };

  errors.first?.type === "required" ? (errors.first = undefined) : "";
  errors.first?.type === "min" ? (errors.first.ref?.value === "" ? (errors.first = undefined) : "") : "";
  errors.second?.type === "required" ? (errors.second = undefined) : "";
  errors.second?.type === "min" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
        <div className="mb-2.5">
          <h2 className="mb-4 text-sm font-bold leading-5">{getNotice(type)?.data.header1}</h2>
          <input
            type="text"
            className={`form_input ${errors.first ? "warnning" : dirtyFields.first ? "entering" : ""} `}
            {...register("first")}
            value={inputs.first}
          />
          <div className="h-[18px] pl-2">
            <span className={`text-xs leading-[18px] ${errors.first ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.first ? getNotice(type)?.data.notice1 : ""}
            </span>
          </div>
        </div>
        <div className="mb-2.5">
          <h2 className="mb-4 mt-6 text-sm font-bold leading-5">{getNotice(type)?.data.header2}</h2>
          <input
            type={inputType}
            className={`form_input ${errors.second ? "warnning" : ""} ${dirtyFields.second ? "entering" : ""}`}
            {...register("second")}
            value={inputs.second}
          />
          <div className="h-[18px] pl-2">
            <span className={`text-xs leading-[18px] ${errors.second ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.second ? getNotice(type)?.data.notice2 : ""}
            </span>
          </div>
        </div>
        <button
          type="submit"
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
