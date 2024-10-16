"use client";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StrategyTemplate = ({ name, successRate}) => {
  const doughnutData = {
    datasets: [
      {
        label: 'Success Rate',
        data: [100 - successRate, successRate],
        backgroundColor: ['white', '#4caf50'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '70%', // Makes the chart a ring/doughnut by cutting out the center
  };

  return (
    <div className="bg-blue-500">
      <h2 className="absolute top-[4%] left-[4%] text-white font-bold text-lg">{name}</h2>
      <div className="absolute top-[15%] left-0 w-[100%] border-b-4 border-gray-200"></div>
      <div className="absolute top-[20%] right-[6%] w-[120px] h-[120px]">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
      <h2 className="absolute top-[37%] right-[15%] text-white font-bold text-lg">{successRate+"%"}</h2>
      <div className="absolute bottom-[18%] left-0 w-[100%] border-b-4 border-gray-200"></div>
      
      <div className="absolute bottom-[2%] left-0 w-full flex justify-center">
        <button className="bg-gray-200 text-black font-bold py-2 px-4 rounded hover:bg-gray-500">
          Add to My Strategy
        </button>
      </div>
      
    </div>
  );
};

const App = () => {

  return (
    <div className="h-[220vh] bg-gray-100 relative">
      {/* Vertical Border */}
      <div className="absolute top-0 left-0 h-full w-[70%] border-r-4 border-gray-200"></div>
      {/* Horizontal Border */}
      <div className="absolute top-0 left-0 w-[100%] border-b-4 border-gray-200"></div>
      {/* Left-Side Dashboard */}
      <div className="absolute top-10 left-[2%] w-[65%] h-[25%] bg-gray-200 rounded-lg shadow-lg p-4">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      </div>
      {/* Header: Strategy Templates with View All Link */}
      <div className="absolute top-[30%] left-[2%] w-[65%] h-[70%]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Strategy Templates</h2>
          <a href="/dashboard/strategies/strategy_templates" className="text-blue-500 cursor-pointer hover:underline">View All</a>
        </div>
        {/* Square Boxes */}
        <div className="grid grid-cols-2 gap-[6%]">
          {/* Short-Strangle Box */}
          <div className="absolute left-0 w-[47%] h-[27%] bg-blue-500 flex items-center justify-center text-white font-semibold">
            <StrategyTemplate name="Short-Strangle" successRate={60}/>
          </div>
          {/* Template 2 */}
          <div className="absolute left-[54%] w-[47%] h-[27%] bg-blue-500 flex items-center justify-center text-white font-semibold">
            <StrategyTemplate name="Short-Straddle" successRate={55}/>
          </div>
          {/* Template 3 */}
          <div className="absolute top-[37%] left-0 w-[47%] h-[27%] bg-blue-500 flex items-center justify-center text-white font-semibold">
            <StrategyTemplate name="Long-Strangle" successRate={20}/>
          </div>
          {/* Template 4 */}
          <div className="absolute top-[37%] left-[54%] w-[47%] h-[27%] bg-blue-500 flex items-center justify-center text-white font-semibold">
            <StrategyTemplate name="Long-Straddle" successRate={25}/>
          </div>
          {/* Template 5 */}
          <div className="absolute top-[69%] left-0 w-[47%] h-[27%] bg-blue-500 flex items-center justify-center text-white font-semibold">
            <StrategyTemplate name="Iron-Conder" successRate={57}/>
          </div>
          {/* Template 6 */}
          <div className="absolute top-[69%] left-[54%] w-[47%] h-[27%] bg-blue-500 flex items-center justify-center text-white font-semibold">
            <StrategyTemplate name="Butterfly" successRate={65}/>
          </div>
        </div>
        {/* Bottom View All Link */}
        <div className="absolute bottom-0 right-0 text-blue-500 cursor-pointer hover:underline mt-4">
          <a href="/dashboard/strategies/strategy_templates">View All</a>
        </div>
      </div>
      {/* Right-Side Dashboard: Deployed Strategies with View All Link */}
      <div className="absolute top-10 left-[72%] w-[30%] h-[200vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Deployed Strategies</h2>
          <a href="/dashboard/strategies/deployed_strategies" className="text-blue-500 cursor-pointer hover:underline">View All</a>
        </div>
      </div>
    </div>
  );
};

export default App;
