import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

interface Hodnotenie {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  FX: number;
  FN: number;
}

interface Zaznam {
  rok: string;
  hodnotenie: Hodnotenie;
}

// Pastel color palette
const PASTEL_COLORS = [
  "#F72585", "#B5179E", "#7209B7", "#3A0CA3", "#3F37C9", "#4361EE", "#4895EF", "#4CC9F0"
];

const DynamicXMLChart: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Plynulý posun
    });
  };

  const [data, setData] = useState<Zaznam[]>([]);
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/z03.xml.txt");
      const xmlText = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");

      const records = Array.from(xml.getElementsByTagName("zaznam"));

      const parsedData = records.map(record => ({
        rok: record.getElementsByTagName("rok")[0].textContent || "",
        hodnotenie: {
          A: Number(record.getElementsByTagName("A")[0].textContent),
          B: Number(record.getElementsByTagName("B")[0].textContent),
          C: Number(record.getElementsByTagName("C")[0].textContent),
          D: Number(record.getElementsByTagName("D")[0].textContent),
          E: Number(record.getElementsByTagName("E")[0].textContent),
          FX: Number(record.getElementsByTagName("FX")[0].textContent),
          FN: Number(record.getElementsByTagName("FN")[0].textContent),
        }
      }));

      setData(parsedData);
    };

    fetchData();
  }, []);

  // Detect screen size and set isMobile accordingly
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is typical mobile breakpoint
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container mx-auto px-4 mt-28 py-8">
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {data.map((zaznam, index) => {
          const chartData = [
            { name: 'A', value: zaznam.hodnotenie.A },
            { name: 'B', value: zaznam.hodnotenie.B },
            { name: 'C', value: zaznam.hodnotenie.C },
            { name: 'D', value: zaznam.hodnotenie.D },
            { name: 'E', value: zaznam.hodnotenie.E },
            { name: 'FX', value: zaznam.hodnotenie.FX },
            { name: 'FN', value: zaznam.hodnotenie.FN },
          ];

          return (
            <div key={index} className={`bg-white shadow-lg p-6 rounded-lg ${isMobile ? "w-full" : "w-80"}`}>
              <h2 className="text-center text-lg font-bold mb-4">{zaznam.rok}</h2>
              <ResponsiveContainer width="100%" height={300}>
                {chartType === "bar" ? (
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    layout={isMobile ? "vertical" : "horizontal"} // Dynamicky mení orientáciu
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type={isMobile ? "number" : "category"} tick={{ fontSize: 12 }} />
                    <YAxis type={isMobile ? "category" : "number"} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" barSize={isMobile ? 50 : 30}> {/* Širší bar na mobile */}
                      {chartData.map((_entry, index) => (
                        <Cell key={`bar-cell-${index}`} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={PASTEL_COLORS[index % PASTEL_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                )}
              </ResponsiveContainer>

              {/* Statická legenda */}
              <div className="flex flex-wrap justify-center mt-4">
                {chartData.map((entry, index) => (
                  <div key={index} className="flex items-center mr-4 mb-2">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: PASTEL_COLORS[index % PASTEL_COLORS.length] }}
                    ></div>
                    <span className="text-sm font-medium">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => { setChartType("bar"); scrollToTop(); }}
          className={`px-4 py-2 font-bold ${chartType === "bar" ? "bg-[#3F37C9] text-white" : "bg-gray-200 text-[#3F37C9]"} rounded-xl`}
        >
          Stĺpcový
        </button>
        <button
          onClick={() => { setChartType("pie"); scrollToTop(); }}
          className={`px-4 py-2 font-bold ${chartType === "pie" ? "bg-[#3F37C9] text-white" : "bg-gray-200 text-[#3F37C9]"} rounded-xl`}
        >
          Koláčové
        </button>
      </div>
    </div>
  );
};

export default DynamicXMLChart;