"use client";
import React from "react";
import UserReservationItem from "../CardItem/UserReservationItem";

function UserReservationList() {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <UserReservationItem buttonName="확인하기" key={index}>
          <div className="font-bold">gg</div>
          <div>gg</div>
        </UserReservationItem>
      ))}
    </ul>
  );
}

export default UserReservationList;
