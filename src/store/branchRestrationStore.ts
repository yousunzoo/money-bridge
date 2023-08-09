import { create } from "zustand";

export interface ISelectCompany {
  companyId: number;
  name: string;
  address: string;
  specificAddress: string;
}

export interface IBranchRestrationProps {
  isRegOpen: boolean;
  setIsRegOpen: (isOpen: boolean) => void;
  selectCompany: ISelectCompany;
  setSelectCompany: (company: ISelectCompany) => void;
  isRegSelect: boolean;
  setIsRegSelect: (isSelect: boolean) => void;
}

const initialState: IBranchRestrationProps = {
  isRegOpen: false,
  isRegSelect: false,
  selectCompany: {
    companyId: 0,
    name: "",
    address: "",
    specificAddress: "",
  },
  setIsRegOpen: () => {},
  setSelectCompany: () => {},
  setIsRegSelect: () => {},
};

const branchRestrationStore = create<IBranchRestrationProps>(set => ({
  ...initialState,
  setIsRegOpen: (isOpen: boolean) => set({ isRegOpen: isOpen }),
  setSelectCompany: (companyValue: ISelectCompany) => set({ ...companyValue, selectCompany: companyValue }),
  setIsRegSelect: (isSelect: boolean) => set({ isRegSelect: isSelect }),
}));

export const useBranchRestrationStore = () => branchRestrationStore(state => state);
