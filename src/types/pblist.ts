import { MouseEvent } from "react";
import { ISpeciality } from "./join";

export interface ICompanyListProps {
  companyList: ICompanyList;
  nowCompany: string;
  handleIDClick: (e: MouseEvent<HTMLLIElement>) => void;
}

export interface ISpecialityListProps {
  nowSpeciality: string;
  handleIDClick: (e: MouseEvent<HTMLUListElement>) => void;
}

export type TSpeciality =
  | "KOREAN_STOCK"
  | "US_STOCK"
  | "DERIVATIVE"
  | "FUND"
  | "ETF"
  | "REAL_ESTATE"
  | "BOND"
  | "WRAP"
  | null;
export interface ISpecialityData {
  id: string;
  text: TSpeciality;
}

export interface ISpecialityList extends Array<ISpecialityData> {}

export interface ICompany {
  id: number;
  logo: string;
  name: string;
}

export interface ICompanyList extends Array<ICompany> {}

export interface IPropensityList {
  [key: string]: {
    propensity: string;
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

export interface IPBListRequest {
  sort: "distance" | "career";
  location: {
    latitude: number;
    longitude: number;
  };
  speciality?: string;
  company?: string;
}

export interface IPBListParams {
  latitude?: string;
  longitude?: string;
  speciality?: string;
  company?: string;
  page: number;
}
