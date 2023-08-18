"use client";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const getCookie = (key: string) => {
  try {
    return cookies.get(key);
  } catch (error) {
    console.error(error);
  }
};

export const setCookie = (key: string, data: string, options?: { maxAge?: number; expires?: Date }) => {
  try {
    cookies.set(key, data, {
      path: "/",
      ...options,
    });
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
