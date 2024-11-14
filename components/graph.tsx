"use client";

import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

const generateTemperatureData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      x: i,
      y: Math.round((Math.random() * 15 + 15) * 10) / 10,
    });
  }
  return [{ id: "temperature", data: data }];
};

export function Graph() {
  // Define the type for the temperature data
  type TemperatureDataPoint = { x: number; y: number };
  type TemperatureData = { id: string; data: TemperatureDataPoint[] }[];

  // Update the state to use the defined type
  const [temperatureData, setTemperatureData] = useState<TemperatureData>([]);

  useEffect(() => {
    setTemperatureData(generateTemperatureData());
  }, []);

  return (
    <div className="w-full h-[450px] bg-black text-white p-4">
      <h2 className="text-3xl font-bold mb-2 ml-4">
        Daily Report - Temperature
      </h2>
      <p className="text-xl text-gray-300 mb-4 ml-4">
        Temperature fluctuations over the past 24 hours
      </p>
      <div className="h-[calc(100%-60px)]">
        <ResponsiveLine
          data={temperatureData}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.1f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Hour",
            legendOffset: 36,
            legendPosition: "middle",
            format: (value) => `${value}:00`,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Temperature (°C)",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          theme={{
            background: "transparent",
            text: {
              fill: "#ffffff",
            },
            // fontSize: 11,
            axis: {
              domain: {
                line: {
                  stroke: "#ffffff",
                  strokeWidth: 1,
                },
              },
              legend: {
                text: {
                  fill: "#ffffff",
                },
              },
              ticks: {
                line: {
                  stroke: "#ffffff",
                  strokeWidth: 1,
                },
                text: {
                  fill: "#ffffff",
                },
              },
            },
            grid: {
              line: {
                stroke: "#444444",
                strokeWidth: 1,
              },
            },
            legends: {
              text: {
                fill: "#ffffff",
              },
            },
            tooltip: {
              container: {
                background: "#000000",
                color: "#ffffff",
                fontSize: "12px",
              },
            },
          }}
          colors={{ scheme: "category10" }}
          lineWidth={2}
          enableGridX={false}
          enableArea={true}
          areaOpacity={0.1}
          enablePoints={false}
          // legends={[
          //   {
          //     anchor: "bottom",
          //     direction: "row",
          //     justify: false,
          //     translateX: 0,
          //     translateY: 50,
          //     itemsSpacing: 0,
          //     itemDirection: "left-to-right",
          //     itemWidth: 80,
          //     itemHeight: 20,
          //     itemOpacity: 0.75,
          //     symbolSize: 12,
          //     symbolShape: "circle",
          //     symbolBorderColor: "rgba(255, 255, 255, .5)",
          //     effects: [
          //       {
          //         on: "hover",
          //         style: {
          //           itemBackground: "rgba(255, 255, 255, .03)",
          //           itemOpacity: 1,
          //         },
          //       },
          //     ],
          //   },
          // ]}
        />
      </div>
    </div>
  );
}
