import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { useMediaQuery } from "react-responsive";

type ChartDataType = {
  [key: string]: number | string;
}

type TickProps = {
  fill: string;
  fontWeight: string;
  fontSize: number;
  fontFamily: string;
};

type AxisProps = {
  tickLine: boolean;
  axisLine: boolean;
  tick: TickProps;
  tickMargin: number;
};

type ChartProps = {
  chartConfig: any,
  chartData: ChartDataType[],
  xAxis: AxisProps & {
    dataKey: string;
    interval: number;
    padding: {
      left: number;
      right: number;
    };
  };
  yAxis: AxisProps & {
    tickLine: boolean;
    axisLine: boolean;
    tickMargin: number;
    tickFormatter: (value: number) => string;
    domain: number[];
    tickCount: number;
  };
};

export default function CustomChart({ chartConfig, chartData, xAxis, yAxis }: ChartProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)'})
  return (
    <div className={`w-full h-full ${isMobile && "overflow-x-scroll"} [&::-webkit-scrollbar]:h-2 
        [&::-webkit-scrollbar-track]:rounded-full 
        [&::-webkit-scrollbar-track]:bg-gray-10110
        [&::-webkit-scrollbar-thumb]:bg-[#868687]`}>
      <ChartContainer config={chartConfig} className="w-full min-w-[750px] mb-4 border-2 border-[#0E0F0C1F] rounded-3xl pr-6 py-10 mx-auto">
        <LineChart
          data={chartData}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="35%" stopColor="#F7D45B" />
              <stop offset="100%" stopColor="#192C8A" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e0e0e0" vertical={false} />
          <XAxis {...xAxis} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <YAxis {...yAxis}/>
          <Line
            dataKey="requests"
            type="linear"
            stroke="url(#colorGradient)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}