import axios, { AxiosError } from "axios";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";
import { reissueToken } from "./services/etc";

const createInstance = (ContentType: string) => {
  const instance = axios.create({
    // TODO: env
    // baseURL: "http://ec2-3-37-11-7.ap-northeast-2.compute.amazonaws.com:8080/",
    baseURL: "https://money-bridge.shop:8080/",
    timeout: 3000,
    headers: {
      "Content-Type": ContentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    request => {
      const token = getCookie("Authorization");
      if (token) request.headers["Authorization"] = `${token}`;
      return request;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const {
        config,
        response: { status, data },
      } = error;
      if (status === 401 && data.msg === "unAuthorized") {
        const accessToken = getCookie("Authorization");
        if (accessToken) {
          const originalRequest = config;
          const { data } = await reissueToken();
          setCookie("Authorization", data.headers.authorization);
          return axios(originalRequest);
        } else {
          removeCookie("refreshToken");
        }
      }

      return Promise.reject(error);
    },
  );
  return instance;
};
export const instance = createInstance("application/json");
export const formInstance = createInstance("multipart/form-data");
