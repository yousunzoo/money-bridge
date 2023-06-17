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
}

interface IAgreements {
  title: string;
  type: string;
  isAgreed: boolean;
}
