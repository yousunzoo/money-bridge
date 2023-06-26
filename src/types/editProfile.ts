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
  errors: FieldErrors<IEditProfileFormValues>;
  register: UseFormRegister<IEditProfileFormValues>;
  removeFile: (type: string) => void;
  profile: string;
}

export interface IPortfolioInputProps {
  errors: FieldErrors<IEditProfileFormValues>;
  register: UseFormRegister<IEditProfileFormValues>;
  removeFile: (type: string) => void;
  portfolio: string;
}

export interface ICompanyInputProps {
  getValues: UseFormGetValues<IEditProfileFormValues>;
  setValue: UseFormSetValue<IEditProfileFormValues>;
}

export interface ICareerInputProps {
  defaultValue: number;
  errors: FieldErrors<IEditProfileFormValues>;
  register: UseFormRegister<IEditProfileFormValues>;
}

export interface ICareersInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  removeItems: (type: string, nowId: string) => void;
  careers: ICareer[];
  addCareers: () => void;
  errors: FieldErrors<IEditProfileFormValues>;
}

export interface IAwardsInputProps {
  errors: FieldErrors<IEditProfileFormValues>;
  register: UseFormRegister<IEditProfileFormValues>;
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

export interface IFigureInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  getValues: UseFormGetValues<IEditProfileFormValues>;
  errors: FieldErrors<IEditProfileFormValues>;
}

export interface IIntroInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  intro: string;
}

export interface IMsgInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  msg: string;
}
export interface IAwardFormProps {
  award: IAward;
  errors: FieldErrors<IEditProfileFormValues>;
  removeItems: (type: string, nowId: string) => void;
  register: UseFormRegister<any>;
}

export interface ICareerFormProps {
  careerData: ICareer;
  errors: FieldErrors<IEditProfileFormValues>;
  removeItems: (type: string, nowId: string) => void;
  register: UseFormRegister<any>;
}

export interface ISelectSpecialityProps {
  specialityData: string[];
  handleToggleButtons: (id: string) => void;
}
