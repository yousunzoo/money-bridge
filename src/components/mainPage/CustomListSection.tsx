import ContentCardItem from "../common/Card/CardItem/ContentCardItem";
import { getContents } from "@/app/apis/services/common";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getUserContents } from "@/app/apis/services/user";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

interface BoardListProps {
  career: number;
  companyLogo: string;
  id: number;
  isBookmarked: boolean;
  msg: string;
  pbName: string;
  tag1: string;
  tag2: string;
  title: string;
}
function CustomListSection() {
  const { userInfo, userLoading, isLogined } = useGetUserInfo();

  const {
    data: boardList,
    error,
    isLoading,
  } = useQuery<BoardListProps[], AxiosError>(["boardList"], userInfo?.role === "USER" ? getUserContents : getContents, {
    staleTime: 60000,
  });
  if (!userInfo || !boardList) return;

  console.log(boardList);
  return (
    <section className="relative mt-3 w-full ">
      <h3 className="text-xl font-bold">
        {userInfo.name} 님의 성향을 딱! 맞춘
        <br /> 실제 PB의 투자 정보
      </h3>
      <ul className="flex flex-wrap items-center justify-between py-4">
        {boardList && boardList.map(item => <ContentCardItem key={item.id} item={item} bookmarks={false} />)}
      </ul>
    </section>
  );
}

export default CustomListSection;
