import Image from "next/image";
import logo from "/public/assets/images/logo.png";
import Link from "next/link";

function NotFound() {
  return (
    <section>
      <Image src={logo} width={200} height={100} alt="logo" />
      <div className="my-14 flex flex-col gap-4 break-keep leading-6">
        <p className="font-bold">
          죄송합니다. <br />
          요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p>
          방문하시려는 페이지의 주소가 잘못 입력되었거나, <br />
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
      </div>
      <Link className="button" href="/">
        홈 화면으로 이동
      </Link>
    </section>
  );
}

export default NotFound;
