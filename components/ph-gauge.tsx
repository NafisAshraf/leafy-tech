"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";

const getColor = (ph: number): string => {
  if (ph < 5) return "#FF6347"; // Brighter red for strongly acidic
  if (ph < 6) return "#FFA07A"; // Brighter dark red for acidic
  if (ph < 7) return "#FFFF00"; // Brighter yellow for slightly acidic
  if (ph === 7) return "#32CD32"; // Brighter green for neutral
  if (ph < 8) return "#00BFFF"; // Brighter cyan for slightly alkaline
  if (ph < 9) return "#008080"; // Teal for mildly alkaline
  if (ph < 10) return "#008080"; // Teal for moderately alkaline
  if (ph < 11) return "#008080"; // Teal for strongly alkaline
  return "#007ACC"; // Brighter blue for very alkaline
};

const getStatus = (ph: number): string => {
  if (ph < 5) return "Strongly Acidic";
  if (ph < 6) return "Acidic";
  if (ph < 7) return "Slightly Acidic";
  if (ph === 7) return "Neutral";
  if (ph < 8) return "Slightly Alkaline";
  if (ph < 9) return "Mildly Alkaline";
  if (ph < 10) return "Moderately Alkaline";
  if (ph < 11) return "Strongly Alkaline";
  return "Very Alkaline";
};

const phReferenceValues = [
  { value: 0, label: "0" },
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 14, label: "14" },
];

// const statusLabels = [
//   { label: "Strongly Acidic", color: "#FF6347" },
//   { label: "Acidic", color: "#FFA07A" },
//   { label: "Slightly Acidic", color: "#FFFF00" },
//   { label: "Neutral", color: "#32CD32" },
//   { label: "Slightly Alkaline", color: "#00BFFF" },
//   { label: "Mildly Alkaline", color: "#008080" },
//   { label: "Moderately Alkaline", color: "#008080" },
//   { label: "Strongly Alkaline", color: "#008080" },
//   { label: "Very Alkaline", color: "#007ACC" },
// ];

const PHGauge = ({
  value,
  containerWidth,
}: {
  value: number;
  containerWidth: number;
}) => {
  const radius = containerWidth / 2 - 20; // Adjusting radius based on container width
  console.log("Radius: ", radius); // Log the radius
  const strokeWidth = 20;
  const normalizedValue = (value / 14) * 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width={containerWidth} height={containerWidth} viewBox="0 0 300 300">
      <circle
        cx="150"
        cy="150"
        r={radius}
        fill="none"
        stroke="#333"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="150"
        cy="150"
        r={radius}
        fill="none"
        stroke={getColor(value)}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        transform="rotate(-90 150 150)"
        strokeLinecap="round"
        style={{
          transition:
            "stroke-dashoffset 0.5s ease-in-out, stroke 0.5s ease-in-out",
          strokeDashoffset:
            circumference - (normalizedValue / 100) * circumference,
        }}
      />
      <text
        x="150"
        y="150"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="48"
        fill="white"
        fontWeight="bold"
        style={{ transition: "all 0.5s ease-in-out" }}
      >
        {value.toFixed(1)}
      </text>
    </svg>
  );
};

export function PhGauge() {
  const [phValue, setPhValue] = useState<number>(7);
  const [containerWidth, setContainerWidth] = useState<number>(300); // Assuming a default width

  useEffect(() => {
    const updatePh = () => {
      const newPh = Math.round((Math.random() * 14 + Number.EPSILON) * 10) / 10;
      setPhValue(newPh);
    };

    updatePh(); // Initial update
    const interval = setInterval(updatePh, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log("Window Width: ", width); // Log the window width
      let newContainerWidth = 270; // Default width
      if (width < 480) {
        newContainerWidth = 250; // Adjusting width for extra small screens
      } else if (width < 640) {
        newContainerWidth = 270; // Adjusting width for small screens
      } else if (width < 768) {
        newContainerWidth = 270; // Adjusting width for medium small screens
      } else if (width < 1024) {
        newContainerWidth = 270; // Adjusting width for medium screens
      } else if (width < 1280) {
        newContainerWidth = 270; // Adjusting width for medium large screens
      } else if (width < 1440) {
        newContainerWidth = 270; // Adjusting width for large screens
      } else {
        newContainerWidth = 270; // Adjusting width for extra large screens
      }
      setContainerWidth(newContainerWidth); // Adjusting width dynamically based on screen size
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="flex items-center justify-center w-full">
          <div className="h-[270px] w-[270px]">
            <PHGauge value={phValue} containerWidth={containerWidth} />
          </div>
        </div>
        <div className="h-[260px] flex flex-col justify-between align-center">
          {phReferenceValues.map((ref) => (
            <div key={ref.value} className="flex items-center">
              <div
                className="w-4 h-1 mr-2"
                style={{ backgroundColor: getColor(ref.value) }}
              />
              <span className="text-sm text-white">{ref.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Label
          className="text-lg font-semibold text-white"
          style={{ transition: "color 0.5s ease-in-out" }}
        >
          Status: {getStatus(phValue)}
        </Label>
      </div>
    </>
  );
}
