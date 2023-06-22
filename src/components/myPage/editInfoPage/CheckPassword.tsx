import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonModal from "@/components/common/ButtonModal";
import { useRouter } from "next/navigation";
import { ButtonModalProps } from "@/types/common";
import { useWithdraw } from "@/hooks/useWithdraw";
import { useCheckPassword } from "@/hooks/useCheckPassword";

const yup_password = yup.string().min(8).max(15).matches(/^\S+$/).required();
const checkBlank = (value: string) => {
  return value.includes(" ");
};

function CheckPassword({
  type,
  setIsUser,
}: {
  type: "check" | "withdraw";
  setIsUser?: Dispatch<SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { withdraw, IsWithdrawed, withdrawError } = useWithdraw();
  const { checkPassword, isChecked, isNotChecked } = useCheckPassword();
  const [modalContents, setModalContents] = useState<ButtonModalProps["modalContents"]>({
    content: "",
    confirmText: "",
  });
  const router = useRouter();

  const schema = yup.object().shape({
    password: yup_password,
  });

  const {
    register,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = getValues("password");
    // 비밀번호 확인
    if (type === "check") {
      checkPassword(password);
      return;
    }

    // 회원 탈퇴
    if (type === "withdraw") {
      withdraw(password);
      return;
    }
  };

  useEffect(() => {
    if (IsWithdrawed) {
      setIsOpen(true);
      setModalContents({
        content: "탈퇴가 완료되었습니다.",
        confirmText: "확인",
        confirmFn: () => router.replace("/"),
      });
      return;
    }
    if (isChecked && setIsUser) {
      setIsUser(true);
      return;
    }
    if (withdrawError || isNotChecked) {
      setIsOpen(true);
      setModalContents({
        content: "비밀번호가 일치하지 않습니다. 다시 시도해주세요.",
        confirmText: "확인",
      });
    }
  }, [IsWithdrawed, withdrawError, isChecked, isNotChecked]);
  return (
    <>
      <h3 className="mb-12 text-xl font-bold">
        {type === "check" ? "개인 정보 수정을" : "탈퇴하기"} 위해
        <br />
        비밀번호를 입력해주세요
      </h3>
      <form onSubmit={handleSubmit} className="flex h-[310px] flex-col justify-between">
        <div>
          <input
            type="password"
            className={`form_input pr-3 ${errors.password ? "warnning" : ""} ${isDirty ? "entering" : ""}`}
            {...register("password")}
            placeholder="비밀번호를 입력해주세요"
          />
          {isDirty && (
            <>
              <p className={`pt-1 text-xs ${errors.password ? "text-status-alert" : "text-status-positive"}`}>
                *영문(대소문자), 숫자 포함하여 8자 이상으로 작성해 주세요.
              </p>
              <p
                className={`pt-1 text-xs ${
                  checkBlank(getValues("password")) ? "text-status-alert" : "text-status-positive"
                }`}
              >
                *공백없이 작성해 주세요.
              </p>
            </>
          )}
        </div>
        <button className={`button ${!isValid && "inactive"}`} disabled={!isValid}>
          {type === "check" ? "확인" : "탈퇴하기"}
        </button>
      </form>
      {isOpen && (
        <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen}>
          {type === "check" && <p>다시 입력해주세요.</p>}
        </ButtonModal>
      )}
    </>
  );
}

export default CheckPassword;
