"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const yup_email = yup.string().email().required();
const yup_password = yup.string().min(8).max(15).required();
const yup_name = yup.string().min(2).max(10).required();
const yup_phone = yup.string().min(10).max(11).required();

function DoubleInputForm({
  type,
  setNextStep,
}: {
  type: string;
  setNextStep?: (value: React.SetStateAction<boolean>) => void;
}) {
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  const { first, second } = inputs;
  const inputType = type === "login" ? "password" : type === "findEmail" ? "number" : "text";

  const schema = yup.object().shape({
    first: type === "login" ? yup_email : yup_name,
    second: type === "login" ? yup_password : type === "findEmail" ? yup_phone : yup_email,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

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

  return (
    <div className="pt-[100px]">
      <form onSubmit={() => handleSubmit(onSubmit)} onChange={handleChange}>
        <div className="mb-[10px]">
          <h2 className="mb-[20px] font-bold">{getNotice(type)?.data.header1}</h2>
          <input type="text" className="formInput" {...register("first")} value={first} />
          <span className={`text-xs ${errors.first ? "text-red-600" : "text-slate-300"}`}>
            {getNotice(type)?.data.notice1}
          </span>
        </div>
        <div className="mb-[10px]">
          <h2 className="mb-[20px] font-bold">{getNotice(type)?.data.header2}</h2>
          <input type={inputType} className="formInput" {...register("second")} value={second} />
          <span className={`text-xs ${errors.second ? "text-red-600" : "text-slate-300"}`}>
            {getNotice(type)?.data.notice2}
          </span>
        </div>
        {/* <button type="submit" className="h-[40px] w-full bg-gray-300 "> */}
        <button type="button" className={`h-[40px] w-full ${isValid ? "bg-black" : "bg-gray-300"}`} onClick={onSubmit}>
          <span className="text-xs font-semibold text-slate-400">{getNotice(type)?.data.submit}</span>
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
          notice1: "* @포함하여 작성해 주세요.",
          notice2: "* 8자 이상입니다.",
          submit: "로그인",
          func: "",
        },
      };
    case "findEmail":
      return {
        data: {
          header1: "이름",
          header2: "휴대폰 번호",
          notice1: "* 정확한 이름을 입력해주세요",
          notice2: "* -자 없이 숫자로만 적어주세요",
          submit: "확인",
          func: "",
        },
      };
    case "findPassword":
      return {
        data: {
          header1: "이름",
          header2: "이메일",
          notice1: "* 정확한 이름을 입력해주세요",
          notice2: "* @포함하여 작성해 주세요.",
          submit: "인증코드 받기",
          func: "",
        },
      };
  }
};
