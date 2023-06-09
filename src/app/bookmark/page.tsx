import React from 'react'
import Link from "next/link";

function BookMark() {
  return (
    <div>
      <div>
        <Link href="/bookmark/content">콘텐츠</Link>
        <Link href="/bookmark/pb">PB</Link>
      </div>
    </div>
  );
}

export default BookMark;