import { MouseEvent } from "react";

export interface ICompanyListProps {
  companyList: ICompanyList;
  nowCompany: string;
}

export interface ISpecialityListProps {
  nowSpeciality: string;
  handleIDClick: (e: MouseEvent<HTMLUListElement>) => void;
}

export interface ISpeciality {
  id: string;
  text: string;
}

export interface ISpecialityList extends Array<ISpeciality> {}

export interface ICompany {
  id: number;
  logo: string;
  name: string;
}

export interface ICompanyList extends Array<ICompany> {}

export interface IPropensityList {
  [key: string]: {
    propensity: IPropensity;
    bar: number;
    lossRisk: string;
    pursuit: string;
    productRisk: string;
  };
}

export interface IPropensityCardProps {
  userPropensity: IPropensity;
}

export type IPropensity = "CONSERVATIVE" | "CAUTIOUS" | "BALANCED" | "AGGRESSIVE" | "SPECULATIVE";
