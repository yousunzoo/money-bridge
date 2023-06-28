import * as yup from "yup";

export const yup_email = yup.string().required();
export const yup_password = yup
  .string()
  .min(8)
  .max(15)
  .matches(/^(?=\S*[a-zA-Z])(?=\S*\d)\S+$/)
  .required();
export const yup_name = yup.string().min(2).max(10).required();
export const yup_phone = yup
  .string()
  .min(10)
  .max(11)
  .matches(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/)
  .required();
