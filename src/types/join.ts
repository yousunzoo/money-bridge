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
  businessCard: File | null;
}

interface IAgreements {
  title: string;
  type: string;
  isAgreed: boolean;
}

export interface ICompanyList {
  status: number;
  msg: string;
  data: {
    list: ICompanyListData[];
  };
}

interface ICompanyListData {
  id: number;
  name: string;
}
