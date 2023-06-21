import { instance } from "./../axios";
import { IJoinInformation } from "@/types/join";
import { IUser } from "@/types/login";

export const userLogin = async (user: IUser) => {
  const res = await instance.post("/login", user);
  return res;
};

export const userJoin = async ({ joinData, joinType }: { joinData: IJoinInformation; joinType: string }) => {
  const res = await instance.post(`/join/${joinType}`, joinData);
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

export const userLogout = async () => {
  try {
    const res = await instance.post("/auth/logout");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.data.value);
  }
};

export const userWithdraw = async (password: string) => {
  const data = { password };
  try {
    const res = await instance.delete("/auth/account", { data });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const userCheckPassword = async (password: string) => {
  try {
    const res = await instance.post("/auth/password", { password });
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const getMyInfo = async () => {
  try {
    const res = await instance.get("/auth/myinfo");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const editMyInfo = async (data: { [key: string]: string }) => {
  try {
    const res = await instance.patch("/auth/myinfo", data);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};
