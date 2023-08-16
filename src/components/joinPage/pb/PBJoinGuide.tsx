import Link from "next/link";

function PBJoinGuide() {
  return (
    <>
      <p className="mb-6 text-3xl font-bold mt-14">PB 가입 안내</p>
      <p className="mb-[300px]">
        PB 가입 이메일 계정은 회원 식별 고유 키입니다.
        <br />
        증권사 PB임을 검증하기 위해
        <br />
        가능한 등록된 회사 이메일계정으로
        <br />
        가입해주시기 바랍니다.
      </p>
      <Link
        className="flex h-14 w-full items-center justify-center rounded-[8px] bg-primary-normal text-white"
        href={"/join/pb/email"}
      >
        PB 회원가입
      </Link>
    </>
  );
}

export default PBJoinGuide;
