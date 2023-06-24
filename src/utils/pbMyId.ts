import { CommonROLE } from "@/constants/enum";

export const getMyId = (userData:any, id:any) => {
  const isPb = userData?.role === CommonROLE.PB;
  const pbId = userData?.id === id;

  if (isPb && pbId) {
    return userData?.id;
  }
};
