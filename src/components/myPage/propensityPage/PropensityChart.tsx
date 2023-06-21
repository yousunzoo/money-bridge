import { propensityChart } from "@/constants/propensityList";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController,
);
function PropensityChart({ propensity }: { propensity: string }) {
  const backgroundColors = propensityChart.map(item => (item.name === propensity ? "#3A7391" : "#EBEBEB"));
  const dataLabels = propensityChart.map(item => {
    const color = item.name === propensity ? "#3A7391" : "#565656";
    return {
      color,
      font: { weight: item.name === propensity ? "bold" : "normal" },
    };
  });

  console.log(backgroundColors);
  const data = {
    labels: propensityChart.map(item => item.name),
    datasets: [
      {
        type: "line" as const,
        data: propensityChart.map(item => item.expectedReturn),
        borderColor: "#3A7391",
        backgroundColor: backgroundColors,
      },
      {
        type: "bar" as const,
        data: propensityChart.map(item => item.expectedReturn),
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        padding: 10,
        bodyFont: {
          font: {},
        },
        callbacks: {
          title: () => {
            return "예금";
          },
          label: (context: any) => {
            const label = context.raw;
            const nowPropensity = propensityChart.find(item => item.expectedReturn === label);

            return nowPropensity?.range;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        afterDataLimits: scale => {
          scale.max = scale.max * 1.1;
        },
        max: 10,
        min: 0,
      },
    },
  };

  return (
    <section className="mb-10 w-full rounded-lg bg-white p-4 shadow-md">
      <h3 className="mb-4 border-b-1 border-dashed border-background-normal pb-4 text-2xl font-bold text-primary-normal">
        투자성향 별 기대 수익
      </h3>
      <div className="w-full">
        <Chart type="bar" data={data} options={options} />
      </div>
    </section>
  );
}

export default PropensityChart;
