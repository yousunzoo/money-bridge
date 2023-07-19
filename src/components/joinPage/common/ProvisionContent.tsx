import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEvent } from "react";
import { pbRequired, userRequired } from "./AgreeProvision";
import checkProvision from "/public/assets/images/checkProvision.svg";
import uncheckProvision from "/public/assets/images/uncheckProvision.svg";
import openProvision from "/public/assets/images/openProvision.svg";

function ProvisionContent(
  key: number,
  subTitle: string,
  setIsChecked: (index: number) => void,
  isChecked: boolean,
  handleOpenProvision: (e: MouseEvent<HTMLElement>) => void,
) {
  const pathName = usePathname();
  const required = pathName.split("/")[2] === "user" ? userRequired : pbRequired;
  const handleClick = () => {
    setIsChecked(key);
  };
  return (
    <div className={`border relative flex h-14 w-full min-w-[358px] items-center gap-4 pl-6 pr-4 `}>
      <button className="flex h-6 w-6 items-center justify-center" onClick={handleClick}>
        <Image src={isChecked ? checkProvision : uncheckProvision} alt="check" width={18} height={24} />
      </button>
      <span className="leading-6">
        {key < required.length ? "[필수] " : "[선택] "}
        {subTitle}
      </span>
      <button
        id={key.toString()}
        className="absolute right-6 z-10 flex h-6 w-6 items-center justify-center"
        onClick={handleOpenProvision}
      >
        <Image src={openProvision} alt="open" width={13} height={21} id={key.toString()} />
      </button>
    </div>
  );
}

export default ProvisionContent;
