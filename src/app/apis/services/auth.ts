import { IJoinInformation, joinInDTO } from "@/types/join";
import { formInstance, instance } from "../axios";
import { IUser } from "@/types/login";

export const userLogin = async (user: IUser) => {
  const res = await instance.post("/login", user);
  return res;
};

export const userJoin = async (joinData: IJoinInformation) => {
  const res = await instance.post(`/join/user`, joinData);
  return res.data;
};

export const pbJoin = async (joinData: IJoinInformation) => {
  const { email, password, name, phoneNumber, businessCard, branchId, career, speciality1, speciality2, agreements } =
    joinData;
  const formData = new FormData();

  if (businessCard) {
    formData.append("businessCard", businessCard);
  }
  const joinInDTO: joinInDTO = {
    email,
    password,
    name,
    phoneNumber,
    branchId,
    career,
    speciality1,
    speciality2,
    agreements,
  };

  formData.append("joinInDTO", new Blob([JSON.stringify(joinInDTO)], { type: "application/json" }));

  const res = await formInstance.post(`/join/pb`, formData);
  return res.data;
};

export const joinAuthentication = async (email: string) => {
  const res = await instance.post("/email/authentication", { email: email });
  return res.data;
};

export const findEmail = async (user: IUser) => {
  const res = await instance.post("/email", user);
  return res.data;
};

export const passwordAuthentication = async (user: IUser) => {
  const res = await instance.post("/password", user);
  return res.data;
};

export const resetPassword = async (user: IUser) => {
  const res = await instance.patch("/password", user);
  return res.data;
};

export const getCompanyList = async () => {
  const res = await instance.get(`/companies?includeLogo=false`);
  return res.data;
};

export const getCompanyLocation = async (companyId: number, keyword: string) => {
  const res = await instance.get(`/branch?companyId=${companyId}&keyword=${keyword}`);
  return res.data;
};
