"use client";

import { yup_name, yup_phone } from "@/constants/yupSchema";
import { IEditInfoFormProps } from "@/types/my";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";
import ButtonModal from "@/components/common/ButtonModal";
import { useMutation } from "@tanstack/react-query";
import { phoneNumCheck } from "@/app/apis/services/common";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

function EditInfoForm({ type, onSubmit }: IEditInfoFormProps) {
  const [isCheck, setIsCheck] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [isReButtonOpen, setIsReButtonOpen] = useState(false);
  const { userInfo } = useGetUserInfo();
  const schema = yup.object().shape({
    inputValue: type === "name" ? yup_name : yup_phone,
  });

  const {
    register,
    getValues,
    reset,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(getValues("inputValue"));
    onSubmit({ [type]: value });
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
      setIsCheck(!data.duplicated);
      setIsButtonOpen(!data.duplicated);
      setIsReButtonOpen(data.duplicated);
    },
  });
  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    const phoneNumber = getValues("inputValue");
    if (!userInfo) return;
    const role = userInfo.role === "PB" ? "pb" : "user";
    mutate({ phoneNumber, type: role });
  };

  useEffect(() => {
    setIsCheck(isValid);
  }, [isValid]);

  return (
    <>
      <h3 className="mb-12 text-xl font-bold">재설정할 {type === "name" ? "이름을" : "휴대폰 번호를"} 입력해주세요</h3>
      <form onSubmit={handleSubmit} className="flex h-[310px] flex-col ">
        <div>
          <div>
            <div className="relative flex items-center">
              <input
                type="text"
                className={`form_input ${errors.inputValue ? "warnning" : dirtyFields.inputValue ? "entering" : ""} `}
                placeholder={type === "name" ? "이름을 입력해주세요" : "전화번호를 입력해주세요"}
                {...register("inputValue")}
                autoFocus
              />
              {dirtyFields.inputValue && (
                <>
                  <button
                    type="button"
                    className="input_button bg-[url('/assets/images/clear.svg')]"
                    tabIndex={-1}
                    onClick={() => reset()}
                  ></button>
                  <Image src={errors.inputValue ? alert : correct} alt="input_status" className="input_status" />
                </>
              )}
            </div>
          </div>
          {isDirty && type === "phoneNumber" && (
            <p className={`pt-1 text-xs ${errors.inputValue ? "text-status-alert" : "text-status-positive"}`}>
              ‘-’ 없이 숫자만 입력해 주세요.
            </p>
          )}
        </div>
        {type === "phoneNumber" && (
          <button onClick={handleCheck} className={`button mt-2 ${!isValid && "inactive"}`} disabled={!isValid}>
            휴대폰번호 중복확인
          </button>
        )}
        <button className={`button mt-20 ${!isCheck && "inactive"}`} disabled={!isCheck}>
          확인
        </button>
      </form>

      {isButtonOpen && <ButtonModal modalContents={modalContents} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen} />}
      {isReButtonOpen && (
        <ButtonModal modalContents={modalReContents} isOpen={isReButtonOpen} setIsOpen={setIsReButtonOpen} />
      )}
    </>
  );
}

export default EditInfoForm;
