import { Graph } from "@/components/graph";
import { Histogram } from "@/components/histogram";
import { HumidityGauge } from "@/components/humidity-gauge";
import { PhGauge } from "@/components/ph-gauge";
import { PieChart } from "@/components/piechart";
import { TemperatureGauge } from "@/components/temperature-gauge";
import { WeatherConditionComponent } from "@/components/weather-condition";
import { IoIosCheckmarkCircle } from "react-icons/io";

const statusObject = {
  "All Systems Check": "Normal",
  "Power Supply": "Normal",
  "Sensor Connections": "Normal",
  "Network Status": "Normal",
  "Water Level": "Normal",
};

export default function Home() {
  return (
    <main className=" flex justify-center">
      <div className=" w-[92%] lg:w-[95%]">
        <div className="row py-3 mx-2">
          <div className="col-lg-2 col-4 px-3 ">
            <div className="flex justify-center items-center py-4 h-[500px] border border-white rounded rounded-3">
              <div className="flex flex-col">
                {Object.entries(statusObject).map(([key, value]) => (
                  <div
                    key={key}
                    className="container pb-3 d-flex align-items-center  gap-3"
                  >
                    <div>
                      <IoIosCheckmarkCircle
                        size={34}
                        className="mb-1"
                        color="gray"
                      />
                    </div>
                    <div>
                      <div className="text-white text-md py-3 font-semibold">
                        {key}
                      </div>
                      <div className="text-white text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-8 px-3">
            <div className="py-3 px-5 h-[500px] rounded rounded-4 border border-white bg-black flex items-center">
              <div className="container flex flex-col items-center">
                <h2 className="text-white text-center text-3xl fw-semibold mb-4 ">
                  pH Meter
                </h2>
                <PhGauge />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 px-3">
            <div className=" pt-5 pb-3 h-[500px] flex flex-col items-center justify-center rounded rounded-4 border border-white bg-black w-full">
              <h2 className="text-white text-center text-3xl fw-semibold mb-4">
                Total Dissolved Solid (TDS)
              </h2>
              <PieChart />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-11   py-3">
          <div className="col-span-4 px-3">
            <div className="h-[400px] rounded rounded-4 border border-white bg-black flex items-center">
              <div className="container px-0 flex flex-col items-center">
                <h2 className="text-white text-center text-3xl fw-semibold mb-4 ">
                  Temperature
                </h2>
                <TemperatureGauge />
              </div>
            </div>
          </div>
          <div className="col-span-4 px-3">
            <div className="h-[400px] rounded rounded-4 border border-white bg-black flex items-center">
              <div className="container px-0 flex flex-col items-center">
                <h2 className="text-white text-center text-3xl fw-semibold mb-4 ">
                  Humidity
                </h2>
                <HumidityGauge />
              </div>
            </div>
          </div>
          <div className="col-span-3 px-3">
            <div className="h-[400px] rounded rounded-4 border border-white bg-black flex items-center">
              <div className="container px-10 flex flex-col items-center">
                <h2 className="text-white text-center text-3xl fw-semibold mb-4 ">
                  Weather
                </h2>
                <WeatherConditionComponent />
              </div>
            </div>
          </div>
        </div>

        <div className="row py-3 mx-1">
          <div className="col-12 col-xl-8 px-3">
            <div className="py-3 h-[500px] flex flex-col items-center justify-center rounded rounded-4 border border-white bg-black w-full">
              <Graph />
            </div>
          </div>
          <div className="col-12 col-xl-4 px-3">
            <div className="pb-2 h-[500px] flex flex-col items-center justify-center rounded rounded-4 border border-white bg-black w-full">
              <h2 className="text-3xl font-bold text-white mb-2 ">
                Weekly Report
              </h2>
              <Histogram />
              <div className="flex justify-center mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#8884d8]" />
                  <span className="ml-2 text-white">Minimum</span>
                </div>
                <div className="flex items-center ml-4">
                  <div className="w-4 h-4 bg-[#82ca9d]" />
                  <span className="ml-2 text-white">Average</span>
                </div>
                <div className="flex items-center ml-4">
                  <div className="w-4 h-4 bg-[#ffc658]" />
                  <span className="ml-2 text-white">Maximum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">{/* <Graph /> */}</div>
      </div>
    </main>
  );
}
