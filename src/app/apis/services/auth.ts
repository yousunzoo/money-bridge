import { IJoinInformation } from "@/types/join";
import { instance } from "../axios";

interface IUser {
  email: string;
  password: string;
  role: string;
}

export const userLogin = async (user: IUser) => {
  const res = await instance.post("/login", user);
  return res.data;
};

export const userJoin = async ({ joinData, joinType }: { joinData: IJoinInformation; joinType: string }) => {
  const res = await instance.post(`/join/${joinType}`, joinData);
  console.log(res);
  return res.data;
};
