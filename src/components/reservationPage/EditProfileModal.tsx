import { useReservationStore } from "@/store/reservationStore";
import { IEditProfileModalProps } from "@/types/reservation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const yup_phone = yup.string().min(10).max(11).required();
const yup_name = yup.string().min(2).max(10).required();

function EditProfileModal({ moveToNextStep, handleCloseModal, userInfo }: IEditProfileModalProps) {
  const { userName, userEmail, userPhoneNumber } = userInfo;
  const { setAnswers } = useReservationStore();
  const [editedInfo, setEditedInfo] = useState({
    userName,
    userPhoneNumber,
    userEmail,
  });

  const schema = yup.object().shape({
    userName: yup_name,
    userPhoneNumber: yup_phone,
  });

  const {
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    const { value, id } = e.target;
    setEditedInfo({ ...editedInfo, [id]: value });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    setAnswers(5, editedInfo);
    handleCloseModal();
    moveToNextStep(5);
  };
  return (
    <>
      <h2 className="mb-6 text-xl font-bold">예약자 정보 수정</h2>
      <p className="mb-10 text-xs">*기본 정보와 예약자가 다른 경우에만 수정해주세요</p>
      <form onSubmit={e => onSubmit(e)} onChange={handleChange}>
        <div className="flex flex-col gap-10 px-5">
          <div className="flex w-full flex-wrap justify-between gap-2">
            <label htmlFor="userName">이름</label>
            <input
              id="userName"
              className="text-right font-bold"
              value={editedInfo.userName}
              {...register("userName")}
            />
            <p className={`w-full text-right text-xs leading-3 ${errors.userName && "text-status-alert"}`}>
              *이름을 정확하게 입력해주세요.
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-between gap-2">
            <label htmlFor="userPhoneNumber">휴대폰 번호</label>
            <input
              id="userPhoneNumber"
              className="text-right font-bold"
              value={editedInfo.userPhoneNumber}
              {...register("userPhoneNumber")}
            />
            <p className={`w-full text-right text-xs leading-3 ${errors.userPhoneNumber && "text-status-alert"}`}>
              *'-' 없이 숫자로만 입력해주세요.
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-between gap-2">
            <label htmlFor="email">이메일</label>
            <p>{userEmail}</p>
            <p className="text-gray-400 w-full text-right text-xs leading-3">*이메일은 수정이 불가합니다.</p>
          </div>
        </div>
        <button className="button mt-16">저장하기</button>
      </form>
    </>
  );
}

export default EditProfileModal;
