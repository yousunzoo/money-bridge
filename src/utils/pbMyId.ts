import { CommonROLE } from "@/constants/enum";

export const getMyId = (role: string | undefined, userId: number | undefined, PbId: number) => {
  const isPb = role === CommonROLE.PB;
  const pbId = userId === PbId;

  if (isPb && pbId) {
    return userId;
  }
};
