import { yupResolver } from "@hookform/resolvers/yup";
import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const yup_phone = yup
  .string()
  .matches(/^[0-9]{10,11}$/i)
  .required();

function EditPhoneNumberForm({ onSubmit }: { onSubmit: (data: { [key: string]: string }) => void }) {
  const schema = yup.object().shape({
    phoneNumber: yup_phone,
  });

  const {
    register,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneNumber = String(getValues("phoneNumber"));
    onSubmit({ phoneNumber });
    // // mutate 전화번호 수정 api요청, 리턴값에 따라 state 처리
    // setIsUser(true);
    // // setIsOpen(true);
  };
  return (
    <>
      <h3 className="mb-12 text-xl font-bold">재설정할 휴대폰 번호를 입력해주세요</h3>
      <form onSubmit={handleSubmit} className="flex h-[310px] flex-col justify-between">
        <div>
          <input
            type="phone "
            className={`form_input pr-3 ${errors.phoneNumber ? "warnning" : ""} ${isDirty ? "entering" : ""}`}
            {...register("phoneNumber")}
            placeholder="비밀번호를 입력해주세요"
          />
          {isDirty && (
            <p className={`pt-1 text-xs ${errors.phoneNumber ? "text-status-alert" : "text-status-positive"}`}>
              ‘-’ 없이 숫자만 입력해 주세요.
            </p>
          )}
        </div>
        <button className={`button ${!isValid && "inactive"}`} disabled={!isValid}>
          확인
        </button>
      </form>
    </>
  );
}

export default EditPhoneNumberForm;
