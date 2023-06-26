import { IFigureInputProps } from "@/types/editProfile";

function FigureInput({ errors, register, getValues }: IFigureInputProps) {
  const isError =
    errors["cumulativeReturn"] || errors["maxDrawdown"] || errors["profitFactor"] || errors["averageProfit"];
  return (
    <section className="mb-10">
      <p className="mb-2 text-xl font-bold">실적을 입력해주세요.</p>
      <p className={`mb-4 text-xs ${isError && "text-status-alert"}`}>소수점 2자리까지의 숫자로만 입력해주세요.</p>
      <ul className="rounded-sm bg-white p-4 shadow-md">
        <li className="mb-3 flex items-center">
          <input
            className={`edit_input ${errors["cumulativeReturn"] && "warnning"}`}
            placeholder="누적 수익률을 입력해주세요."
            {...register("cumulativeReturn", {
              pattern: /^\d+(\.\d{1,2})?$/,
            })}
            defaultValue={getValues("cumulativeReturn")}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">%</span>
        </li>
        <li className="mb-3 flex items-center">
          <input
            className={`edit_input ${errors["maxDrawdown"] && "warnning"}`}
            placeholder="최대 자본인하율을 입력해주세요."
            defaultValue={getValues("maxDrawdown")}
            {...register("maxDrawdown", {
              pattern: /^\d+(\.\d{1,2})?$/,
            })}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">%</span>
        </li>
        <li className="mb-3 flex items-center">
          <input
            className={`edit_input ${errors["averageProfit"] && "warnning"}`}
            placeholder="평균 손익률을 입력해주세요."
            defaultValue={getValues("averageProfit")}
            {...register("averageProfit", {
              pattern: /^\d+(\.\d{1,2})?$/,
            })}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">%</span>
        </li>
        <li className="mb-3 flex items-center">
          <input
            className={`edit_input ${errors["profitFactor"] && "warnning"}`}
            placeholder="Profit Factor를 입력해주세요."
            defaultValue={getValues("profitFactor")}
            {...register("profitFactor", {
              pattern: /^\d+(\.\d{1,2})?$/,
            })}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">: 1</span>
        </li>
      </ul>
    </section>
  );
}

export default FigureInput;
