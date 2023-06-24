import { speciality } from "@/constants/pbListMenu";
import { ISelectSpecialityProps } from "@/types/my";

function SelectSpeciality({ specialityData, handleToggleButtons }: ISelectSpecialityProps) {
  const specialityList = speciality.filter(item => item.id !== "ALL");
  return (
    <ul className="flex flex-wrap gap-4">
      {specialityList.map(item => {
        const isActive = specialityData.includes(item.id);
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => {
                handleToggleButtons(item.id);
              }}
              className={`chip ${isActive && "selected"}`}
            >
              {item.text}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default SelectSpeciality;
