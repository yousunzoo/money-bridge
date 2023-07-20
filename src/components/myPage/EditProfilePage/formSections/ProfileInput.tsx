import { IProfileInputProps } from "@/types/editProfile";
import { validateFileSize } from "@/utils/validateFileSize";
import { useFormContext } from "react-hook-form";
function ProfileInput({ removeFile, profile }: IProfileInputProps) {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xl font-bold">프로필 이미지 업로드</p>
        <div>
          <button
            onClick={() => removeFile("profile")}
            type="button"
            className="mr-2 rounded-[8px] bg-primary-normal px-4 py-2 text-xs font-bold text-white shadow-md"
          >
            삭제
          </button>
          <label
            className="cursor-pointer rounded-[8px] bg-white px-5 py-2 text-xs font-bold text-primary-normal shadow-md"
            htmlFor="profile"
          >
            이미지 찾기
          </label>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            id="profile"
            {...register("profile", { validate: validateFileSize })}
          />
        </div>
      </div>
      <p
        className={`text-ellipsis rounded-md bg-white p-4 shadow-sm ${
          profile ? "text-gray-heavy" : "text-placeholder"
        }`}
      >
        {profile && profile !== "https://pb-business-card.s3.ap-northeast-2.amazonaws.com/profile.svg"
          ? profile
          : "이미지를 등록해주세요"}
      </p>
      <p className={`mt-2 text-sm ${profile && errors["profile"] && "text-status-error"}`}>
        파일 크기는 100MB 이하여야 합니다.
      </p>
    </section>
  );
}

export default ProfileInput;
