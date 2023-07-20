import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IAward } from "./my";

export interface IEditProfileFormValues {
  [key: string]: any;
  intro: string;
  msg: string;
  profile: string | FileList;
  portfolio: string | FileList;
  company: string;
  companyId: number;
  branchName: string;
  profitFactor: number;
  maxDrawdown: number;
  cumulativeReturn: number;
  averageProfit: number;
  career: number;
}

export interface IProfileInputProps {
  removeFile: (type: string) => void;
  profile: string;
}

export interface IPortfolioInputProps {
  removeFile: (type: string) => void;
  portfolio: string;
}

export interface ICompanyInputProps {
  branchName: string;
}

export interface ICareerInputProps {
  defaultValue: number;
}

export interface ICareersInputProps {
  removeItems: (type: string, nowId: string) => void;
  careers: ICareer[];
  addCareers: () => void;
}

export interface IAwardsInputProps {
  removeItems: (type: string, nowId: string) => void;
  awards: IAward[];
  addAwards: () => void;
}

export interface ISpecialityInputProps {
  speciality: string[];
  handleToggleButtons: (id: string) => void;
}
export interface ICareer {
  id: string;
  career: string | undefined;
  start: number | undefined;
  end: number | undefined;
}

export interface IAwardFormProps {
  award: IAward;
  removeItems: (type: string, nowId: string) => void;
}

export interface ICareerFormProps {
  careerData: ICareer;
  removeItems: (type: string, nowId: string) => void;
}

export interface ISelectSpecialityProps {
  specialityData: string[];
  handleToggleButtons: (id: string) => void;
}
