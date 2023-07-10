import { FieldValues, Validate } from "react-hook-form";

export const validateFileSize:
  | Validate<any, FieldValues>
  | Record<string, Validate<any, FieldValues>>
  | undefined = file => {
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (typeof file === "string") return true;
  if (file && file[0] && file[0].size > maxSize) {
    return false;
  }
  return true;
};
