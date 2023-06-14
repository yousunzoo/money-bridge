import Image from "next/image";
import React from "react";

function Poster({ img }: any) {
  return <Image src={img} alt="poster" width={300} height={300} />;
}

export default Poster;
