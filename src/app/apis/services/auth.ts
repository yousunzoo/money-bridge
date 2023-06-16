import { IJoinInformation } from "@/types/join";
import { instance } from "../axios";

export interface IUser {
  email: string;
  password?: string;
  role: string;
  phoneNumber?: string;
}

export const userLogin = async (user: IUser) => {
  const res = await instance.post("/login", user);
  return res;
};

export const userJoin = async ({ joinData, joinType }: { joinData: IJoinInformation; joinType: string }) => {
  const res = await instance.post(`/join/${joinType}`, joinData);
  console.log(res);
  return res.data;
};

export const emailAuthentication = async (email: string) => {
  const res = await instance.post("/email/authentication", { email: email });
  console.log(res.data);
  return res.data;
};

export const findEmail = async (user: IUser) => {
  const res = await instance.post("/email", user);
  console.log(res.data);
  return res.data;
};
