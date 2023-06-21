import { instance } from "@/app/apis/axios";

export const userBookMarkPB = async (page:number) => {
  try {
    const res = await instance.get(`/user/bookmarks/pb?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userBookMarkContent = async (page: number) => {
  try {
    const res = await instance.get(`/auth/bookmarks/boards?page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
