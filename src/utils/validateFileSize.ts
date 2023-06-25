import { IEditProfileFormValues } from "@/types/editProfile";
import { Validate } from "react-hook-form";

export const validateFileSize: Validate<string | FileList, IEditProfileFormValues> = file => {
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (typeof file === "string") return true;
  if (file && file[0] && file[0].size > maxSize) {
    return "파일 크기는 100MB 이하여야 합니다.";
  }
  return true;
};
