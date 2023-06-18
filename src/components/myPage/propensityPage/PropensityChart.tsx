import { Bar, ComposedChart, Line, Tooltip, XAxis, YAxis } from "recharts";
import { propensityChart } from "@/constants/propensityList";
import { useEffect, useState } from "react";
function PropensityChart() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <section className="mb-10 w-full rounded-lg bg-white p-4 shadow-md">
      <h3 className="mb-4 border-b-1 border-dashed border-background-normal pb-4 text-2xl font-bold text-primary-normal">
        투자성향 별 기대 수익
      </h3>
      <ComposedChart width={400} height={350} className="-mx-8 w-full" data={propensityChart}>
        <XAxis dataKey="name" scale="auto" width={20} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="volatility" barSize={20} fill="#EBEBEB" />
        {/* <Line type="monotone" dataKey="volatility" stroke="#153445" /> */}
      </ComposedChart>
    </section>
  );
}

export default PropensityChart;
