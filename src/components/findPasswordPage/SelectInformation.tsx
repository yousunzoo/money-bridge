import { usePathname } from "next/navigation";
import InformationItem from "../findEmailPage/InformationItem";
import Link from "next/link";
import { useFindPasswordStore } from "@/store/findPasswordStore";

function SelectInformation() {
  const pathName = usePathname();
  const { data } = useFindPasswordStore();

  return (
    <>
      <p className="mb-10 mt-14 text-xl font-bold leading-7">회원 정보를 확인해주세요.</p>
      <InformationItem information={data} />

      <Link
        href={`/findPassword/${pathName.split("/")[2]}/resetPassword`}
        className="mt-[60px] flex h-14 w-full items-center justify-center rounded-[8px] bg-primary-normal text-xl font-bold text-white"
      >
        비밀번호 재설정
      </Link>
    </>
  );
}

export default SelectInformation;
