"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Iinputs } from "@/types/DoubleInputForm";

const yup_email = yup.string().email().required();
const yup_password = yup.string().min(8).max(15).required();
const yup_name = yup.string().min(2).max(10).required();
const yup_phone = yup.string().min(10).max(11).required();

function DoubleInputForm({
  type,
  setNextStep,
  inputs,
  setInputs,
}: {
  type: string;
  setNextStep?: (value: React.SetStateAction<boolean>) => void;
  inputs: Iinputs;
  setInputs: (value: React.SetStateAction<Iinputs>) => void;
}) {
  const inputType = type === "login" ? "password" : type === "findEmail" ? "number" : "text";

  const schema = yup.object().shape({
    first: type === "login" ? yup_email : yup_name,
    second: type === "login" ? yup_password : type === "findEmail" ? yup_phone : yup_email,
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

  const onSubmit = () => {
    if (!isValid) {
      alert("양식을 확인해");
      return;
    }
    if (setNextStep) {
      setNextStep(true);
    }
  };

  errors.first?.type === "required" ? (errors.first = undefined) : "";
  errors.first?.type === "min" ? (errors.first.ref?.value === "" ? (errors.first = undefined) : "") : "";
  errors.second?.type === "required" ? (errors.second = undefined) : "";
  errors.second?.type === "min" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";

  return (
    <div className="mt-[24px] px-[16px]">
      <form onSubmit={() => handleSubmit(onSubmit)} onChange={handleChange}>
        <div className="mb-[10px]">
          <h2 className="mb-[16px] text-[14px] font-bold leading-[20px]">{getNotice(type)?.data.header1}</h2>
          <input
            type="text"
            className={`formInput ${errors.first ? "formInput_warn" : ""} ${
              dirtyFields.first ? "formInput_entering" : ""
            }`}
            {...register("first")}
            value={inputs.first}
          />
          <div className="h-[18px] pl-[8px]">
            <span className={`text-[12px] leading-[18px] ${errors.first ? "text-[#eb5147]" : "text-[#0090ff]"}`}>
              {dirtyFields.first ? getNotice(type)?.data.notice1 : ""}
            </span>
          </div>
        </div>
        <div className="mb-[10px]">
          <h2 className="mb-[16px] mt-[24px] text-[14px] font-bold leading-[20px]">{getNotice(type)?.data.header2}</h2>
          <input
            type={inputType}
            className={`formInput ${errors.second ? "formInput_warn" : ""} ${
              dirtyFields.second ? "formInput_entering" : ""
            }`}
            {...register("second")}
            value={inputs.second}
          />
          <div className="h-[18px] pl-[8px]">
            <span className={`text-[12px] leading-[18px] ${errors.second ? "text-[#eb5147]" : "text-[#0090ff]"}`}>
              {dirtyFields.second ? getNotice(type)?.data.notice2 : ""}
            </span>
          </div>
        </div>
        {/* <button type="submit" className={`mt-[16px] h-[56px] w-full rounded-[8px] ${isValid ? "bg-[#153445]" : "bg-[#ececec]"}`}> */}
        <button
          type="button"
          className={`mt-[16px] h-[56px] w-full rounded-[8px] ${isValid ? "bg-[#153445]" : "bg-[#ececec]"}`}
          onClick={onSubmit}
        >
          <span className={`text-[20px] font-bold leading-[28px] ${isValid ? "text-white" : "text-[#565656]"}`}>
            {getNotice(type)?.data.submit}
          </span>
        </button>
      </form>
    </div>
  );
}

export default DoubleInputForm;

const getNotice = (type: string) => {
  switch (type) {
    case "login":
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
    case "findEmail":
      return {
        data: {
          header1: "이름",
          header2: "휴대폰 번호",
          notice1: "정확한 이름을 입력해주세요",
          notice2: "-자 없이 숫자로만 적어주세요",
          submit: "확인",
          func: "",
        },
      };
    case "findPassword":
      return {
        data: {
          header1: "이름",
          header2: "이메일",
          notice1: "정확한 이름을 입력해주세요",
          notice2: "@를 포함하여 작성해 주세요.",
          submit: "인증코드 받기",
          func: "",
        },
      };
  }
};
