import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ICompanyInput, ISpeciality } from "./join";
import { Dispatch, SetStateAction } from "react";
import { IAward } from "./my";

export interface IEditProfileFormValues {
  intro: string;
  msg: string;
  profile: string;
  portfolio: string;
  company: string;
  branchName: string;
  profitFactor: number;
  maxDrawdown: number;
  cumulativeReturn: number;
  averageProfit: number;
  career: number;
}

export interface IProfileInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  removeFile: (type: string) => void;
  profile: string;
}

export interface IPortfolioInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  removeFile: (type: string) => void;
  portfolio: string;
}

export interface ICompanyInputProps {
  getValues: UseFormGetValues<IEditProfileFormValues>;
  handleChangeCompany: (item: ICompanyInput) => void;
  companyId: number;
  setLocation: Dispatch<SetStateAction<ICompanyInput>>;
}

export interface ICareerInputProps {
  defaultValue: number;
  register: UseFormRegister<IEditProfileFormValues>;
}

export interface ICareersInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  removeItems: (type: string, nowId: string) => void;
  careers: ICareer[];
  addCareers: () => void;
}

export interface IAwardsInputProps {
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
  content: string | undefined;
  start: number | undefined;
  end: number | undefined;
}

export interface IFigureInputProps {
  register: UseFormRegister<IEditProfileFormValues>;
  getValues: UseFormGetValues<IEditProfileFormValues>;
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
  removeItems: (type: string, nowId: string) => void;
  register: UseFormRegister<any>;
}

export interface ICareerFormProps {
  career: ICareer;
  removeItems: (type: string, nowId: string) => void;
  register: UseFormRegister<any>;
}

export interface ISelectSpecialityProps {
  specialityData: string[];
  handleToggleButtons: (id: string) => void;
}
