"use client";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  BarChart,
} from "recharts";

// Define the structure of our temperature data
interface TemperatureData {
  day: string;
  min: number;
  max: number;
  avg: number;
}

// Sample data for a week's temperature (in Celsius)
const weeklyTemperatureData: TemperatureData[] = [
  { day: "Mon", min: 15, max: 25, avg: 20 },
  { day: "Tue", min: 14, max: 27, avg: 21 },
  { day: "Wed", min: 16, max: 28, avg: 22 },
  { day: "Thu", min: 13, max: 26, avg: 19 },
  { day: "Fri", min: 15, max: 29, avg: 23 },
  { day: "Sat", min: 17, max: 30, avg: 24 },
  { day: "Sun", min: 16, max: 28, avg: 22 },
];

export function Histogram() {
  const processedData = weeklyTemperatureData.map((day) => ({
    ...day,
    belowAvg: day.avg - day.min,
    aboveAvg: day.max - day.avg,
  }));

  // Dynamically calculate the width based on the window size
  const width =
    typeof window !== "undefined" && window.innerWidth <= 768 ? 300 : 450;

  return (
    <BarChart
      data={processedData}
      width={width} // Dynamically specify the width
      height={300} // Specify the height directly
      margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis dataKey="day" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip content={<CustomTooltip />} />

      <Bar dataKey="min" stackId="a" fill="#8884d8" name="Min Temperature" />
      <Bar dataKey="belowAvg" stackId="a" fill="#82ca9d" name="Below Average" />
      <Bar dataKey="aboveAvg" stackId="a" fill="#ffc658" name="Above Average" />
    </BarChart>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; dataKey: string }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const minTemp = payload.find((p) => p.dataKey === "min")?.value;
    if (minTemp === undefined) return null;

    const maxTemp =
      minTemp +
      (payload.find((p) => p.dataKey === "belowAvg")?.value || 0) +
      (payload.find((p) => p.dataKey === "aboveAvg")?.value || 0);
    const avgTemp =
      minTemp + (payload.find((p) => p.dataKey === "belowAvg")?.value || 0);

    return (
      <div className="bg-gray-800 p-4 border border-gray-700 rounded shadow-md">
        <p className="font-bold text-white">{label}</p>
        <p className="text-sm text-blue-300">Min: {minTemp}°C</p>
        <p className="text-sm text-green-300">Avg: {avgTemp}°C</p>
        <p className="text-sm text-yellow-300">Max: {maxTemp}°C</p>
      </div>
    );
  }
  return null;
};
