import dayjs from "dayjs";

export const timeShow = (createdAt: string, updatedAt: string | null) => {
  const createTime = dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss");
  if (!updatedAt) return createTime;
  const updateTime = dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss");
  if (updateTime >= createTime) {
    return updateTime;
  } else {
    return createTime;
  }
};
