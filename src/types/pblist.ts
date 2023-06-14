import { MouseEvent } from "react";

export interface ICompanyListProps {
  nowCompany: string;
  handleIDClick: (e: MouseEvent<HTMLUListElement>) => void;
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
