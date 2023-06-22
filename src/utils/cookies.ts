import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const getCookie = (key: string) => {
  try {
    return cookies.get(key);
  } catch (error) {
    console.error(error);
  }
};

export const setCookie = (key: string, data: string) => {
  try {
    cookies.set(key, data);
  } catch (error) {
    console.error(error);
  }
};

export const removeCookie = (key: string) => {
  try {
    return cookies.remove(key);
  } catch (error) {
    console.error(error);
  }
};
