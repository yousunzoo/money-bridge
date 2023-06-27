"use client";
import React, { useEffect } from "react";
import UserReservationItem from "../common/Card/CardItem/UserReservationItem";
import profile from "/public/assets/images/profile.svg";
import myLocation from "/public/assets/images/myLocation.svg";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSuggestionPB } from "@/app/apis/services/common";
import { useLocationStore } from "@/store/location";
import { AxiosError } from "axios";
import { PbListSectionPorps } from "@/types/main";

function PbListSection() {
  const {
    locations: {
      location,
      coordinate: { latitude, longitude },
    },
  } = useLocationStore();

  const {
    data: pbList,
    error,
    isLoading,
  } = useQuery<PbListSectionPorps[], AxiosError>(["pbSuggestionPB"], () =>
    getSuggestionPB({
      latitude,
      longitude,
    }),
  );

  return (
    <section className="mt-3">
      <h3 className="text-xl font-bold">
        가장 가까이에 있는 <br /> PB를 만나보세요
      </h3>
      <div className="flex justify-end ">
        <span className="mr-1">{location}</span>
        <Image className="mr-2" src={myLocation} alt={"myLocation"} width={14} height={14} />
      </div>
      <ul className="flex flex-col gap-4 py-2 ">
        {pbList &&
          pbList.map(item => (
            <UserReservationItem
              key={item.id}
              buttonName={"정보 보기"}
              href={`/detail/info/${item.id}`}
              isRole={"PB"}
              profileImage={profile}
            >
              <p className="font-bold">{item.name}</p>
              <p>{item.msg}</p>
            </UserReservationItem>
          ))}
      </ul>
    </section>
  );
}

export default PbListSection;
