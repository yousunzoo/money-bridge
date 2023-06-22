import React from "react";
import UserReservationItem from "../common/Card/CardItem/UserReservationItem";
import profile from "/public/assets/images/profile.svg";
import myLocation from "/public/assets/images/myLocation.svg";

import Image from "next/image";
const data = [
  {
    id: 1,
    name: "김피비",
    msg: "김pb입니다.",
    profile: "person.png",
  },
  {
    id: 2,
    name: "박피비",
    msg: "박pb입니다.",
    profile: "person.png",
  },
];
function PbListSection() {
  return (
    <section className="mt-3">
      <h3 className="text-xl font-bold">
        가장 가까이에 있는 <br /> PB를 만나보세요
      </h3>
      <div className="flex justify-end ">
        <span className="mr-1">역삼 1동</span>
        <Image className="mr-2" src={myLocation} alt={"myLocation"} width={14} height={14} />
      </div>
      <ul className="flex flex-col gap-4 py-2 ">
        {data.map(item => (
          <UserReservationItem key={item.id} buttonName={"정보 보기"} href={"/"} isRole={"PB"} profileImage={profile}>
            <p className="font-bold">{item.name}</p>
            <p>{item.msg}</p>
          </UserReservationItem>
        ))}
      </ul>
    </section>
  );
}

export default PbListSection;
