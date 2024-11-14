"use client";

import { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";

export function HumidityGauge() {
  const [humidity, setHumidity] = useState(50);
  const [stats, setStats] = useState({ min: 50, max: 50, avg: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newHumidity = Math.random() * (100 - 0) + 0;
      setHumidity(newHumidity);
      setStats((prevStats) => {
        const newMin = Math.min(prevStats.min, newHumidity);
        const newMax = Math.max(prevStats.max, newHumidity);
        const newAvg = (prevStats.avg * 9 + newHumidity) / 10; // Simple moving average
        return { min: newMin, max: newMax, avg: newAvg };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatHumidity = (value: number) => value.toFixed(1) + "%";

  return (
    <div className="flex w-full max-w-lg me-4">
      <div className="w-10/12">
        <GaugeComponent
          arc={{
            subArcs: [
              {
                limit: 40,
                color: "#5BE12C",
                showTick: true,
                tooltip: {
                  text: "Dry",
                  style: { fill: "#FFFFFF" },
                },
              },
              {
                limit: 60,
                color: "#F58B19",
                showTick: true,
                tooltip: {
                  text: "Comfortable",
                  style: { fill: "#FFFFFF" },
                },
              },
              {
                limit: 100,
                color: "#EA4228",
                showTick: true,
                tooltip: {
                  text: "Humid",
                  style: { fill: "#FFFFFF" },
                },
              },
            ],
          }}
          labels={{
            valueLabel: {
              formatTextValue: formatHumidity,
              style: { fill: "#FFFFFF" },
            },
            tickLabels: {
              type: "outer",
              ticks: [{ value: 40 }, { value: 60 }],
              defaultTickValueConfig: {
                formatTextValue: formatHumidity,
              },
            },
          }}
          value={humidity}
        />
      </div>
      <div className="w-px bg-gray-300 mx-4"></div> {/* Added separator */}
      <div className="w-2/12 space-y-2">
        <div className="grid grid-cols-1 gap-4 h-full text-center items-center py-3 justify-center">
          <div>
            <p className="font-semibold text-white">
              {formatHumidity(stats.min)}
            </p>
            <p className="text-xs text-white">Minimum</p>
          </div>
          <div>
            <p className="font-semibold text-white">
              {formatHumidity(stats.max)}
            </p>
            <p className="text-xs text-white">Maximum</p>
          </div>
          <div>
            <p className="font-semibold text-white">
              {formatHumidity(stats.avg)}
            </p>
            <p className="text-xs text-white">Average</p>
          </div>
        </div>
      </div>
    </div>
  );
}
