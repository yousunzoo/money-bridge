import { Propensity } from "@/constants/enum";
import StepProgress from "./StepProgress";
import MyReservationStatus from "./MyReservationStatus";
import BookmarkPreview from "./BookmarkPreview";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/app/apis/services/user";
import { IPropensity } from "@/types/pblist";

function UserInfo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    refetchOnWindowFocus: false,
  });

  if (!data || isLoading) return;

  const { name, propensity, step, reservationCount, boardBookmark, pbBookmark } = data;

  return (
    <section className="mb-10">
      <h2 className="mb-9 text-2xl font-bold">
        반가워요, {name}님!
        <br />
        {propensity ? (
          <>
            나의 투자성향은 <span className="text-primary-light">{Propensity[propensity as IPropensity]}</span>
          </>
        ) : (
          <>오늘은 어떤 PB를 만나볼까요?</>
        )}
      </h2>
      <StepProgress step={step} />
      <MyReservationStatus reservationCount={reservationCount} />
      <BookmarkPreview boardBookmark={boardBookmark} pbBookmark={pbBookmark} />
    </section>
  );
}

export default UserInfo;
