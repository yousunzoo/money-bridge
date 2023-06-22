import { getCompanyLocation } from "@/app/apis/services/auth";
import { ICompanyLocationList } from "@/types/join";
import { useQuery } from "@tanstack/react-query";

export const useGetCompnayLocation = (companyId: number, keyword: string) => {
  const { data } = useQuery<any, unknown, ICompanyLocationList, any>(["companyLocation", companyId, keyword], () =>
    getCompanyLocation(companyId, keyword),
  );

  return data;
};
