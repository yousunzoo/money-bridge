import { IPropensityInfoCardProps } from "@/types/my";
import Image from "next/image";

function PropensityInfoCard({ propensity, info }: IPropensityInfoCardProps) {
  return (
    <section className="mb-10 w-full rounded-lg bg-white p-4 shadow-md">
      <h3 className="mb-4 border-b-1 border-dashed border-background-normal pb-4 text-2xl font-bold text-primary-normal">
        {propensity}
      </h3>
      <ul>
        {info.map(text => (
          <li className="mb-1 flex items-center gap-2" key={text}>
            <Image src="/assets/images/checkProvision.svg" width={20} height={20} alt="check" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PropensityInfoCard;
