import { IEditInfoFormProps } from "@/types/my";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { FormEvent, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import alert from "/public/assets/images/alert.svg";
import correct from "/public/assets/images/correct.svg";

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
    setValue,
    getValues,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("inputValue", "");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(getValues("inputValue"));
    onSubmit({ [type]: value });
  };
  return (
    <>
      <h3 className="mb-12 text-xl font-bold">재설정할 {type === "name" ? "이름을" : "휴대폰 번호를"} 입력해주세요</h3>
      <form onSubmit={handleSubmit} className="flex h-[310px] flex-col justify-between">
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
              {isDirty && (
                <>
                  <button className="input_button" type="reset" tabIndex={-1}></button>
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
        <button className={`button ${!isValid && "inactive"}`} disabled={!isValid}>
          확인
        </button>
      </form>
    </>
  );
}

export default EditInfoForm;
