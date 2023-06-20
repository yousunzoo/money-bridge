import { getCompanyList } from "@/app/apis/services/auth";
import { ICompanyList } from "@/types/join";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyList = () => {
  const { data } = useQuery<any, unknown, ICompanyList, any>(["companyList"], getCompanyList);
  return { data };
};
