import { IEditInfoFormProps } from "@/types/my";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const yup_phone = yup
  .string()
  .matches(/^[0-9]{10,11}$/i)
  .required();
const yup_name = yup.string().min(2).max(10).required();

function EditInfoForm({ type, onSubmit }: IEditInfoFormProps) {
  const schema = yup.object().shape({
    inputValue: type === "name" ? yup_name : yup_phone,
  });

  const {
    register,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(getValues("inputValue"));
    onSubmit({ [type]: value });
    // // mutate 전화번호 수정 api요청, 리턴값에 따라 state 처리
    // setIsUser(true);
    // // setIsOpen(true);
  };
  return (
    <>
      <h3 className="mb-12 text-xl font-bold">재설정할 {type === "name" ? "이름을" : "휴대폰 번호를"} 입력해주세요</h3>
      <form onSubmit={handleSubmit} className="flex h-[310px] flex-col justify-between">
        <div>
          <div>
            <input
              className={`form_input pr-3 ${errors.inputValue ? "warnning" : ""} ${isDirty ? "entering" : ""}`}
              {...register("inputValue")}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          {isDirty && type === "phoneNumber" && (
            <p className={`pt-1 text-xs ${errors.inputValue ? "text-status-alert" : "text-status-positive"}`}>
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

export default EditInfoForm;
