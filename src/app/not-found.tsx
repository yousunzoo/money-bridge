import Image from "next/image";
import logo from "/public/assets/images/logo.png";
import Link from "next/link";

function NotFound() {
  return (
    <section className="text-center">
      <Image src={logo} width={200} height={100} alt="logo" />
      <div className="my-16 flex flex-col gap-4 break-keep leading-6">
        <h3 className="mb-10 text-2xl font-bold">페이지가 없습니다</h3>
        <p>주소가 잘못되었거나 바뀐 것 같습니다.</p>
        <p>다시 확인해주시겠어요?</p>
      </div>
      <nav className="mx-auto flex max-w-[500px] gap-2">
        <Link
          className="flex h-[56px] w-full items-center justify-center rounded-md border-1 border-primary-normal bg-white font-bold text-primary-normal"
          href="/"
        >
          뒤로 가기
        </Link>
        <Link
          className="flex h-[56px] w-full items-center justify-center rounded-md bg-primary-normal font-bold text-white"
          href="/"
        >
          홈 화면으로 이동
        </Link>
      </nav>
    </section>
  );
}

export default NotFound;
