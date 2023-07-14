import Image from "next/image";

function Poster({ img }: { img: string }) {
  return (
    <Image src={img} alt="poster" width={0} height={390} sizes="100vw" className="h-[390px] w-full object-contain" />
  );
}

export default Poster;
