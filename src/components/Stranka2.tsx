import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphPage: React.FC = () => {
  // Explicitný typ pre počiatočný stav
  const [data, setData] = useState<{ sin: number[]; cos: number[] }>({
    sin: [],
    cos: [],
  });

  const [amplitude, setAmplitude] = useState(1);
  const [isSlider, setIsSlider] = useState(true);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    const source = new EventSource('http://old.iolab.sk/evaluation/sse/sse.php');
    setEventSource(source);

    source.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("Prijaté dáta:", newData); // Pre kontrolu prijatých dát
      setData((prevData) => ({
        sin: [...prevData.sin, newData.sin * amplitude],
        cos: [...prevData.cos, newData.cos * amplitude],
      }));
    };

    return () => source.close();
  }, [amplitude]);

  const handleAmplitudeChange = (value: number) => {
    setAmplitude(value);
  };

  const handleStop = () => {
    if (eventSource) eventSource.close();
  };

  // Použitie useMemo na aktualizáciu chartData pri zmene data
  const chartData = useMemo(() => ({
    labels: data.sin.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Zašumený sínus',
        data: data.sin,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Zašumený kosínus',
        data: data.cos,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  }), [data]);

  return (
    <div className="container mx-auto px-4 mt-28 mb-4 py-8">
      <h1 className="text-center text-2xl font-bold mb-6">Graf Zašumených Funkcií</h1>

      <div className="flex justify-center mb-6">
        <div className="w-full md:w-1/2">
          <Line data={chartData} />
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isSlider}
            onChange={() => setIsSlider(!isSlider)}
            className="mr-2"
          />
          Prepni na {isSlider ? 'textové pole' : 'slider'}
        </label>
        {isSlider ? (
          <input
            type="range"
            min="1"
            max="10"
            value={amplitude}
            onChange={(e) => handleAmplitudeChange(Number(e.target.value))}
            className="w-full md:w-1/2"
          />
        ) : (
          <input
            type="number"
            min="1"
            max="10"
            value={amplitude}
            onChange={(e) => handleAmplitudeChange(Number(e.target.value))}
            className="w-full md:w-1/2 border p-2 text-center"
          />
        )}
        <span className="mt-2">Amplitúda: {amplitude}</span>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleStop}
          className="px-4 py-2 font-bold bg-red-500 text-white rounded-xl"
        >
          Koniec
        </button>
      </div>
    </div>
  );
};

export default GraphPage;