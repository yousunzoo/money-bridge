import { JoinFormType } from "@/constants/enum";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useJoinStore } from "@/store/joinStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const yup_email = yup.string().email().required();
const yup_name = yup.string().min(2).max(10).required();
const yup_phone = yup
  .string()
  .matches(/^[0-9]{10,11}$/i)
  .required();

const _nextPath = ["email", "authentication", "password", "name", "phoneNumber", "agreements"];

function JoinInformation({ type }: { type: JoinFormType }) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const authentication = useAuthentication();
  const { setInformations } = useJoinStore();

  const schema = yup.object().shape({
    text: type === JoinFormType.EMAIL ? yup_email : type === JoinFormType.NAME ? yup_name : yup_phone,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema), defaultValues: { text: "" } });

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    const joinType = pathName.split("/")[2];
    const currentPath = pathName.split("/")[3];
    const pathIndex = _nextPath.indexOf(currentPath);

    setInformations(currentPath, value);
    if (type === JoinFormType.EMAIL) {
      authentication(value);
    }

    router.push(`/join/${joinType}/${_nextPath[pathIndex + 1]}`);
  };

  errors.text?.type === "required" ? (errors.text = undefined) : "";
  errors.text?.type === "matches" ? (errors.text.ref?.value === "" ? (errors.text = undefined) : "") : "";

  return (
    <>
      <p className="my-14 text-xl font-bold leading-7">{joinStepRenderer[type].title}</p>
      <p className="mb-2 text-xs leading-[18px]">{joinStepRenderer[type].sub}</p>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
        <input
          type={`${type === JoinFormType.PHONENUMBER ? "number" : "text"}`}
          className={`form_input ${errors.text ? "warnning" : dirtyFields.text ? "entering" : ""} `}
          {...register("text")}
          value={value}
        />
        <div className="h-[18px] pl-2">
          <span className={`text-xs leading-[18px] ${errors.text ? "text-status-alert" : "text-status-positive"}`}>
            {dirtyFields.text ? joinStepRenderer[type].validation : ""}
          </span>
        </div>
        <button
          type="submit"
          className={`mt-[150px] h-14 w-full rounded-[8px] ${isValid ? "bg-primary-normal" : "bg-background-disabled"}`}
          onClick={onSubmit}
          disabled={!isValid}
        >
          <span className={`text-xl font-bold leading-7 ${isValid ? "text-white" : "text-gray-heavy"}`}>
            {type === JoinFormType.EMAIL ? "인증코드 받기" : "다음"}
          </span>
        </button>
      </form>
    </>
  );
}

export default JoinInformation;

interface IStepRenderer {
  title: string;
  sub?: string;
  validation?: string;
}

interface IJoinStepRenderer {
  [key: string]: IStepRenderer;
}

const joinStepRenderer: IJoinStepRenderer = {
  EMAIL: {
    title: "이메일을 입력해 주세요",
    sub: "이메일은 수정이 불가함으로 신중하게 적어주세요.",
    validation: "@를 포함하여 작성해 주세요.",
  },
  NAME: {
    title: "이름을 입력해 주세요",
  },
  PHONENUMBER: {
    title: "휴대폰번호를 입력해 주세요",
    validation: "‘-’ 없이 숫자만 입력해 주세요.",
  },
};
