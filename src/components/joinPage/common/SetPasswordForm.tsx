"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useJoinStore } from "@/store/joinStore";
import { usePathname, useRouter } from "next/navigation";
import { yup_password } from "@/constants/yupSchema";
import Image from "next/image";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";
import { FormEvent, MouseEvent } from "react";

type Tinput = "first" | "second";

function SetPasswordForm() {
  const router = useRouter();
  const pathName = usePathname();
  const { setInformations } = useJoinStore();

  const schema = yup.object().shape({
    first: yup_password,
    second: yup.string().oneOf([yup.ref("first")]),
  });

  const {
    register,
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const joinType = pathName.split("/")[2];

    setInformations("password", getValues("first"));
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
      <form onSubmit={onSubmit}>
        <div className="mb-2.5">
          <div className="relative flex items-center">
            <input
              type="password"
              className={`form_input ${errors.first ? "warnning" : ""} ${dirtyFields.first ? "entering" : ""}`}
              {...register("first")}
            />
            {dirtyFields.first && (
              <>
                <button
                  className="input_button bg-[url('/assets/images/clear.svg')]"
                  tabIndex={-1}
                  onClick={handleClear}
                ></button>
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
                <button
                  className="input_button bg-[url('/assets/images/clear.svg')]"
                  tabIndex={-1}
                  onClick={handleClear}
                ></button>
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
          className={`mt-4 h-14 w-full rounded-[8px] ${
            !isValid
              ? "cursor-not-allowed bg-background-disabled text-gray-heavy"
              : "cursor-pointer bg-primary-normal text-white"
          }`}
          disabled={!isValid}
        >
          <span className={`text-xl font-bold leading-7`}>확인</span>
        </button>
      </form>
    </>
  );
}

export default SetPasswordForm;
