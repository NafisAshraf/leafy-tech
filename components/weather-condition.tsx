"use client";

import { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
} from "lucide-react";

// Mock weather data for multiple conditions (replace with actual API data in a real application)
const weatherData = [
  { condition: "Sunny", temperature: 28, humidity: 45, windSpeed: 8 },
  { condition: "Rainy", temperature: 18, humidity: 80, windSpeed: 15 },
  { condition: "Snowy", temperature: -2, humidity: 70, windSpeed: 10 },
  { condition: "Stormy", temperature: 22, humidity: 75, windSpeed: 25 },
  { condition: "Windy", temperature: 20, humidity: 55, windSpeed: 30 },
  { condition: "Partly Cloudy", temperature: 24, humidity: 60, windSpeed: 12 },
];
const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="h-24 w-24" />;
    case "rainy":
      return <CloudRain className="h-24 w-24" />;
    case "snowy":
      return <CloudSnow className="h-24 w-24" />;
    case "stormy":
      return <CloudLightning className="h-24 w-24" />;
    case "windy":
      return <Wind className="h-24 w-24" />;
    case "partly cloudy":
      return <Cloud className="h-24 w-24" />;
    default:
      return <Cloud className="h-24 w-24" />;
  }
};

export function WeatherConditionComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % weatherData.length);
        setIsTransitioning(false);
      }, 500);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  const currentWeather = weatherData[currentIndex];

  return (
    <div
      className="max-w-md bg-black text-white p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-between transition-opacity duration-500 ease-in-out"
      style={{ opacity: isTransitioning ? 0 : 1 }}
    >
      <div>
        {/* <h2 className="text-3xl font-bold mb-6">Weather</h2> */}
        <div className="flex items-center justify-between mb-8 gap-3">
          {getWeatherIcon(currentWeather.condition)}
          <div className="text-right">
            <p className="text-3xl ">{currentWeather.temperature}°C</p>
            <p className="text-xl mt-2">{currentWeather.condition}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-400">Humidity</p>
          <p className=" font-medium">{currentWeather.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-400">Wind Speed</p>
          <p className=" font-medium">{currentWeather.windSpeed} km/h</p>
        </div>
      </div>
      {/* <div className="flex justify-center mt-6">
        {weatherData.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
