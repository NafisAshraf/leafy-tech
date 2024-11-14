"use client";

import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

const TDS_CATEGORIES = [
  "Calcium",
  "Magnesium",
  "Sodium",
  "Potassium",
  "Bicarbonate",
  // "Chloride",
  // "Sulfate",
];

const generateTDSData = () => {
  return TDS_CATEGORIES.map((category) => ({
    id: category,
    label: category,
    value: Math.floor(Math.random() * 100) + 10,
  }));
};

export function PieChart() {
  const [tdsData, setTDSData] = useState(generateTDSData());
  const [innerRadius, setInnerRadius] = useState(0.5); // Initial inner radius

  useEffect(() => {
    const interval = setInterval(() => {
      setTDSData(generateTDSData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newInnerRadius = 0.5; // Default inner radius
      if (width < 480) {
        newInnerRadius = 0.3; // Adjusting inner radius for extra small screens
      } else if (width < 640) {
        newInnerRadius = 0.4; // Adjusting inner radius for small screens
      } else if (width < 768) {
        newInnerRadius = 0.45; // Adjusting inner radius for medium small screens
      } else if (width < 1024) {
        newInnerRadius = 0.5; // Adjusting inner radius for medium screens
      } else if (width < 1280) {
        newInnerRadius = 0.55; // Adjusting inner radius for medium large screens
      } else if (width < 1440) {
        newInnerRadius = 0.6; // Adjusting inner radius for large screens
      } else {
        newInnerRadius = 0.65; // Adjusting inner radius for extra large screens
      }
      setInnerRadius(newInnerRadius); // Adjusting inner radius dynamically based on screen size
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalTDS = tdsData.reduce((sum, item) => sum + item.value, 0);

  return (
    <>
      <ResponsivePie
        data={tdsData}
        margin={{ top: 40, right: 120, bottom: 80, left: 120 }}
        innerRadius={innerRadius} // Using state for inner radius
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor="white"
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="white"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor="white"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="black"
        colors={{ scheme: "nivo" }}
        theme={{
          background: "transparent",
          text: {
            fill: "#ffffff",
          },
          tooltip: {
            container: {
              background: "#000000",
              color: "#ffffff",
              border: "1px solid #ffffff",
            },
          },
          legends: {
            text: {
              fill: "#ffffff",
            },
          },
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          { match: { id: "Calcium" }, id: "dots" },
          { match: { id: "Magnesium" }, id: "lines" },
        ]}
        motionConfig="wobbly"
        transitionMode="middleAngle"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#ffffff",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
      />
      <div className="mt-2 mb-3 text-center text-lg font-semibold text-white">
        Total TDS: {totalTDS.toFixed(2)} mg/L
      </div>
    </>
  );
}
