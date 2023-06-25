import { CommonROLE } from "@/constants/enum";

export const getMyId = (role: any, Id: any, id: any) => {
  const isPb = role === CommonROLE.PB;
  const pbId = Id === id;

  if (isPb && pbId) {
    return Id;
  }
};
