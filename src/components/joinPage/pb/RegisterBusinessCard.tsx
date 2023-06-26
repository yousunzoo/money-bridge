import { useJoinStore } from "@/store/joinStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";

function BusinessCard() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCard, setSelectedCard] = useState<File | null>(null);
  const { setInformations } = useJoinStore();
  const router = useRouter();

  const handleClick = () => {
    if (selectedCard) {
      setInformations("businessCard", selectedCard);
      router.push("/join/pb/agreements");
    } else {
      fileInputRef.current && fileInputRef.current.click();
    }
  };

  const handleReUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setSelectedCard(file);
  };
  console.log(selectedCard);
  return (
    <>
      <p className="mb-2 mt-14 text-xl font-bold leading-7">
        PB 인증을 위해
        <br />
        명함 사진을 등록해 주세요.
      </p>
      <p className="mb-16 text-xs leading-[18px]">명함 사진은 PB 인증을 위해서만 수집됩니다.</p>
      {selectedCard && (
        <>
          <Image
            src={URL.createObjectURL(selectedCard)}
            alt="card"
            width={358}
            height={200}
            className="border-1 border-black p-1"
          />
          <button
            className="mt-16 h-14 w-full rounded-[8px] border-1 bg-white text-xl font-bold leading-7 text-primary-normal"
            onClick={handleReUpload}
          >
            다시 등록하기
          </button>
        </>
      )}
      <button
        className={` ${
          selectedCard ? "mt-[16px]" : "mt-[342px]"
        } mb-24 h-14 w-full rounded-[8px] bg-primary-normal text-xl font-bold leading-7 text-white`}
        onClick={handleClick}
      >
        {selectedCard ? "다음" : "사진 등록"}
      </button>
      <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleChange} />
    </>
  );
}

export default BusinessCard;
