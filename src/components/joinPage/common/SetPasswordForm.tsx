"use client";
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useJoinStore } from "@/store/joinStore";
import { usePathname, useRouter } from "next/navigation";

const yup_password = yup.string().min(8).max(15).required();

function SetPasswordForm() {
  const [inputs, setInputs] = useState({
    first: "",
    second: "",
  });
  const router = useRouter();
  const pathName = usePathname();
  const { setInformations } = useJoinStore();

  const schema = yup.object().shape({
    first: yup_password,
    second: yup.string().oneOf([yup.ref("first")]),
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
    const joinType = pathName.split("/")[2];

    setInformations("password", inputs.first);
    router.push(`/join/${joinType}/name`);
  };

  errors.first?.type === "required" ? (errors.first = undefined) : "";
  errors.first?.type === "min" ? (errors.first.ref?.value === "" ? (errors.first = undefined) : "") : "";
  errors.second?.type === "required" ? (errors.second = undefined) : "";
  errors.second?.type === "min" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";
  errors.second?.type === "oneOf" ? (errors.second.ref?.value === "" ? (errors.second = undefined) : "") : "";

  return (
    <>
      <p className="my-14 text-xl font-bold leading-7">비밀번호를 입력해 주세요</p>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
        <div className="mb-2.5">
          <input
            type="password"
            className={`form_input ${errors.first || checkWhitespace(inputs.first) ? "warnning" : ""} ${
              dirtyFields.first ? "entering" : ""
            }`}
            {...register("first")}
            value={inputs.first}
          />
          <div className="mt-0.5 h-[18px] pl-2">
            <p className={`text-xs leading-[18px] ${errors.first ? "text-status-alert" : "text-status-positive"}`}>
              {dirtyFields.first ? "*영문(대소문자), 숫자 포함하여 8자 이상으로 작성해 주세요." : ""}
            </p>
            <p
              className={`text-xs leading-[18px] ${
                checkWhitespace(inputs.first) ? "text-status-alert" : "text-status-positive"
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
          type="submit"
          className={`mt-4 h-14 w-full rounded-[8px] ${
            checkWhitespace(inputs.first) || checkWhitespace(inputs.second) || !isValid
              ? "cursor-not-allowed bg-background-disabled text-gray-heavy"
              : "cursor-pointer bg-primary-normal text-white"
          }`}
          disabled={checkWhitespace(inputs.first) || checkWhitespace(inputs.second) || !isValid}
        >
          <span className={`text-xl font-bold leading-7`}>확인</span>
        </button>
      </form>
    </>
  );
}

export default SetPasswordForm;

const checkWhitespace = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      return true;
    }
  }
  return false;
};
