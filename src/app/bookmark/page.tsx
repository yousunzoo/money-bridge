import React from 'react'
import Link from "next/link";
import TopNav from "@/components/common/TopNav";

function BookMark() {
  return (
    <div>
      <TopNav title="북마크"/>
      <div>
        <Link href="/bookmark/content">콘텐츠</Link>
        <Link href="/bookmark/pb">PB</Link>
      </div>
    </div>
  );
}

export default BookMark;