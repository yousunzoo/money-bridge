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
