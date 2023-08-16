import { create } from "zustand";

export interface ISelectCompany {
  companyId: number;
  name: string;
  address: string;
  specificAddress: string;
  latitude: number;
  longitude: number;
}

export interface IBranchRestrationProps {
  isRegOpen: boolean;
  setIsRegOpen: (isOpen: boolean) => void;
  selectCompany: ISelectCompany;
  setSelectCompany: (company: ISelectCompany) => void;
  isRegSelect: boolean;
  setIsRegSelect: (isSelect: boolean) => void;
  isButtonOpen: boolean;
  setIsButtonOpen: (isButtonOpen: boolean) => void;
}

const initialState: IBranchRestrationProps = {
  isRegOpen: false,
  isRegSelect: false,
  isButtonOpen: false,
  selectCompany: {
    companyId: 0,
    name: "",
    address: "",
    specificAddress: "",
    latitude: 0,
    longitude: 0,
  },
  setIsRegOpen: () => {},
  setSelectCompany: () => {},
  setIsRegSelect: () => {},
  setIsButtonOpen: () => {},
};

const branchRestrationStore = create<IBranchRestrationProps>(set => ({
  ...initialState,
  setIsRegOpen: (isOpen: boolean) => set({ isRegOpen: isOpen }),
  setSelectCompany: (companyValue: ISelectCompany) => set({ ...companyValue, selectCompany: companyValue }),
  setIsRegSelect: (isSelect: boolean) => set({ isRegSelect: isSelect }),
  setIsButtonOpen: (isButtonOpen: boolean) => set({ isButtonOpen }),
}));

export const useBranchRestrationStore = () => branchRestrationStore(state => state);
