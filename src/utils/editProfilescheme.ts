import * as yup from "yup";

export const editProfilescheme = () => {
  const company = yup.string().required();
  const branchName = yup.string().required();
  const career = yup.number().min(1).max(100).required();
  const cumulativeReturn = yup.number().required();
  const speciality = yup.array().required();
  const maxDrawdown = yup.number().required();
  const profitFactor = yup.number().required();
  const averageProfit = yup.number().required();
  const intro = yup.string().required();
  const msg = yup.string().required();
  const validationSchema = yup.object({
    company,
    branchName,
    career,
    cumulativeReturn,
    speciality,
    maxDrawdown,
    profitFactor,
    averageProfit,
    intro,
    msg,
  });

  return validationSchema;
};
