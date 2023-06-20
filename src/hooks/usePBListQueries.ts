import { createQueryString } from "@/utils/createQueryString";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent } from "react";

export const usePBListQueries = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortParam = searchParams.get("sort") || "distance";
  const speciality = searchParams.get("speciality");
  const company = searchParams.get("company");
  const nowType = speciality ? "speciality" : "company";

  const redirectPath = () => {
    if (!speciality && !company) {
      redirect("/pblist?speciality=ALL&sort=distance");
    }
  };

  const handleTypeClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const selectedType = e.target.dataset.type as string;

    const url = createQueryString(selectedType, "ALL", sortParam);
    router.push("/pblist?" + url);
  };

  const handleIDClick = (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => {
    if (speciality && !(e.target instanceof HTMLLIElement)) return;
    const selectedId = (e.target instanceof HTMLLIElement ? e.target.dataset.id : e.currentTarget.dataset.id) as string;
    const url = createQueryString(nowType, selectedId, sortParam);
    router.push("/pblist?" + url);
  };

  return { handleTypeClick, handleIDClick, speciality, company, redirectPath };
};
