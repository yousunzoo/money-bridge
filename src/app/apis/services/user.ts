import { instance } from "@/app/apis/axios";

export const userBookMarkPB = async (page:number) => {
  try {
    const res = await instance.get(`/user/bookmarks/pb?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkPropensity = async (score: number) => {
  try {
    const res = await instance.post("/user/propensity", { score });
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserInfo = async () => {
  try {
    const res = await instance.get("/user/mypage");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};

export const getMyPropensity = async () => {
  try {
    const res = await instance.get("/user/mypage/list/pb");
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.status);
  }
};
