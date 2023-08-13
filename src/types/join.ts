import { PBSpecialty } from "@/constants/enum";

export interface IJoinStore {
  informations: IJoinInformation;
  setInformations: (step: string, answer: string | string[] | {}) => void;
  resetInformations: () => void;
}

export interface IJoinInformation {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  agreements: IAgreements[];
  branchId?: number;
  career?: number;
  speciality1?: string;
  speciality2?: string;
  businessCard?: File | null;
}

interface IAgreements {
  title: string;
  type: string;
  isAgreed: boolean;
}

export interface ICompanyNameList {
  status: number;
  msg: string;
  data: {
    list: ICompanyNameListData[];
  };
}

interface ICompanyNameListData {
  id: number;
  name: string;
}

export interface ICompanyLocationList {
  status: number;
  msg: string;
  data: {
    list: ICompanyLocationListData[];
    totalElements: number;
  };
}

interface ICompanyLocationListData {
  id: number;
  name: string;
  roadAddress: string;
  streetAddress: string;
}

export interface ICompanyInput {
  name: string;
  id: number;
  address?: string;
  specificAddress?: string;
}

export interface ISpeciality {
  id: PBSpecialty | null;
  name: string;
}

export interface joinInDTO {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  branchId: number | undefined;
  career: number | undefined;
  speciality1: string | undefined;
  speciality2: string | undefined;
  agreements: IAgreements[];
}

interface IAgreements {
  title: string;
  type: string;
  isAgreed: boolean;
}

export interface IResponseErrorData {
  data: {
    key: string;
    value: string;
  };
  msg: string;
  status: number;
}
