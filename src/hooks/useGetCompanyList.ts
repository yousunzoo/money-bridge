import { getCompanyList } from "@/app/apis/services/auth";
import { ICompanyNameList } from "@/types/join";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyList = () => {
  const { data } = useQuery<any, unknown, ICompanyNameList, any>(["companyList"], getCompanyList);
  return { data };
};
