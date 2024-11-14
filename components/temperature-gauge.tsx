"use client";

import { useState, useEffect } from "react";
import GaugeComponent from "react-gauge-component";

export function TemperatureGauge() {
  const [temperature, setTemperature] = useState(70);
  const [stats, setStats] = useState({ min: 70, max: 70, avg: 70 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = Math.random() * (100 - 0) + 0;
      setTemperature(newTemp);
      setStats((prevStats) => {
        const newMin = Math.min(prevStats.min, newTemp);
        const newMax = Math.max(prevStats.max, newTemp);
        const newAvg = (prevStats.avg * 9 + newTemp) / 10; // Simple moving average
        return { min: newMin, max: newMax, avg: newAvg };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatTemperature = (value: number) => value.toFixed(1) + "°C";

  return (
    <div className="flex w-full max-w-lg me-4">
      <div className="w-10/12">
        <GaugeComponent
          arc={{
            subArcs: [
              {
                limit: 60,
                color: "#5BE12C",
                showTick: true,
                tooltip: {
                  text: "Normal",
                  style: { fill: "#FFFFFF" },
                },
              },
              {
                limit: 80,
                color: "#F58B19",
                showTick: true,
                tooltip: {
                  text: "Moderate",
                  style: { fill: "#FFFFFF" },
                },
              },
              {
                limit: 100,
                color: "#EA4228",
                showTick: true,
                tooltip: {
                  text: "High Temperature",
                  style: { fill: "#FFFFFF" },
                },
              },
            ],
          }}
          labels={{
            valueLabel: {
              formatTextValue: formatTemperature,
              style: { fill: "#FFFFFF" },
            },
            tickLabels: {
              type: "outer",
              ticks: [{ value: 60 }, { value: 80 }],
              defaultTickValueConfig: {
                formatTextValue: formatTemperature,
              },
            },
          }}
          value={temperature}
        />
      </div>
      <div className="w-px bg-gray-300 mx-4"></div> {/* Added separator */}
      <div className="w-2/12 space-y-2">
        <div className="grid grid-cols-1 gap-4 h-full text-center items-center py-3 justify-center">
          <div>
            <p className="font-semibold text-white">
              {formatTemperature(stats.min)}
            </p>
            <p className="text-xs text-white">Minimum</p>
          </div>
          <div>
            <p className="font-semibold text-white">
              {formatTemperature(stats.max)}
            </p>
            <p className="text-xs text-white">Maximum</p>
          </div>
          <div>
            <p className="font-semibold text-white">
              {formatTemperature(stats.avg)}
            </p>
            <p className="text-xs text-white">Average</p>
          </div>
        </div>
      </div>
    </div>
  );
}
