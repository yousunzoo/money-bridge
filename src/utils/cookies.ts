import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const getCookie = () => {
  try {
    return cookies.get("accessToken");
  } catch (error) {
    console.error(error);
  }
};

export const setCookie = (token: string, user: IUser, option: ICookieSetOptions) => {
  try {
    cookies.set("accessToken", token, option);
    cookies.set("userData", user, option);
  } catch (error) {
    console.error(error);
  }
};

interface IUser {
  id: string;
  username: string;
  userId: string;
  profileImg?: string;
  createdAt: string;
  updatedAt: string;
}

interface ICookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  encode?: (value: string) => string;
}
