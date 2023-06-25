import { speciality } from "@/constants/pbListMenu";
import { ISpecialityList, ISpecialityListProps } from "@/types/pblist";

const LI_STYLE = "rounded-sm py-2 text-center text-primary-normal cursor-pointer";
const ACTIVE_STYLE = "bg-primary-normal font-bold text-white";

function SpecialityList({ nowSpeciality, handleIDClick }: ISpecialityListProps) {
  const specialityList = speciality as ISpecialityList;

  return (
    <ul className="grid grid-cols-4 gap-2" onClick={handleIDClick}>
      {specialityList.map(item => (
        <li key={item.id} data-id={item.id} className={`${LI_STYLE} ${nowSpeciality === item.id && ACTIVE_STYLE}`}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default SpecialityList;
