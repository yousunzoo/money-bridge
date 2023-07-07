import { CommonROLE } from "@/constants/enum";

export const getMyId = (role: string | undefined, userId: number | undefined, myId: number) => {
  const isPb = () => {
    if (role === CommonROLE.PB) return true;
  };
  const isUser = () => {
    if (role === CommonROLE.USER) return true;
  };
  const isId = userId === myId;

  if (isUser() && isId) {
    return userId;
  }

  if (isPb() && isId) {
    return userId;
  }
};
