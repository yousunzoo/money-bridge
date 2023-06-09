"use client";
import React from "react";
import UserReservationItem from "../CardItem/UserReservationItem";

function UserReservationList() {
  const onClickhandler = () => {
    alert("zz");
  };
  return (
    <ul>
      <UserReservationItem buttonName="확인하기" onClickhandler={onClickhandler}>
        <div className="font-bold">gg</div>
        <div>gg</div>
      </UserReservationItem>
    </ul>
  );
}

export default UserReservationList;
