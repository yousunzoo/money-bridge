import { IFigureInputProps } from "@/types/editProfile";

function FigureInput({ register, getValues }: IFigureInputProps) {
  return (
    <section className="mb-10">
      <p className="mb-4 text-xl font-bold">실적을 입력해주세요.</p>
      <p className="mb-4 text-xs">소수점 2자리 까지의 숫자로만 입력해주세요.</p>
      <ul className="rounded-sm bg-white p-4 shadow-md">
        <li className="mb-3 flex items-center">
          <input
            className="edit_input"
            type="number"
            placeholder="누적 수익률을 입력해주세요."
            {...register("cumulativeReturn")}
            defaultValue={getValues("cumulativeReturn")}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">%</span>
        </li>
        <li className="mb-3 flex items-center">
          <input
            className="edit_input"
            type="number"
            placeholder="최대 자본인하율을 입력해주세요."
            defaultValue={getValues("maxDrawdown")}
            {...register("maxDrawdown")}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">%</span>
        </li>
        <li className="mb-3 flex items-center">
          <input
            className="edit_input"
            type="number"
            placeholder="평균 손익률을 입력해주세요."
            defaultValue={getValues("averageProfit")}
            {...register("averageProfit")}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">%</span>
        </li>
        <li className="mb-3 flex items-center">
          <input
            className="edit_input"
            type="number"
            placeholder="Profit Factor를 입력해주세요."
            defaultValue={getValues("profitFactor")}
            {...register("profitFactor")}
          />
          <span className="ml-4 w-[100px] text-xl font-bold">: 1</span>
        </li>
      </ul>
    </section>
  );
}

export default FigureInput;
