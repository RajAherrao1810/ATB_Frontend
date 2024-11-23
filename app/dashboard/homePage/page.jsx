"use client";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StrategyTemplate = ({ name, successRate, instrument, strategyType }) => {
  const doughnutData = {
    datasets: [
      {
        label: "Success Rate",
        data: [100 - successRate, successRate],
        backgroundColor: ["red", "green"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%", // Makes the chart a ring/doughnut by cutting out the center
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md text-black h-[250px] flex flex-col justify-between">
      {/* Template Name */}
      <h2 className="font-bold text-lg">{name}</h2>

      {/* Divider */}
      <div className="border-b-4 border-gray-200 my-2"></div>

      {/* Details Section */}
      <div className="flex justify-between">
        {/* Text Info */}
        <div>
          <p className="text-sm">Instrument: {instrument}</p>
          <p className="text-sm">Type: {strategyType}</p>
        </div>

        {/* Doughnut Chart */}
        <div className="w-[80px] h-[80px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      {/* Success Rate */}
      <div className="text-right font-bold text-lg">{successRate}%</div>

      {/* Bottom Divider */}
      <div className="border-b-4 border-gray-200 my-2"></div>

      {/* Add Button */}
      <div className="flex justify-center">
        <button className="bg-gray-200 text-black font-bold py-2 px-4 rounded hover:bg-gray-500">
          Add to My Strategy
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [strategies, setStrategies] = useState([]); // State to store deployed strategies
  const [templates, setTemplates] = useState([]); // State to store strategy templates

  // Fetch deployed strategies from the FastAPI endpoint every second
  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/deployed_strategy");
        const data = await response.json();
        setStrategies(data); // Update the state with the fetched strategies
      } catch (error) {
        console.error("Error fetching deployed strategies:", error);
      }
    };

    const fetchTemplates = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/strategy_templates");
        const data = await response.json();
        setTemplates(data); // Update the state with the fetched templates
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    // Fetch strategies every second
    const interval = setInterval(() => {
      fetchStrategies();
      fetchTemplates();
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Calculate total profit from all strategies
  const totalProfit = strategies.reduce((acc, strategy) => acc + strategy.overall_profit_or_loss, 0);

  return (
    <div className="h-[220vh] bg-gray-100 relative">
      {/* Vertical Border */}
      <div className="absolute top-0 left-0 h-full w-[70%] border-r-4 border-gray-200"></div>
      {/* Horizontal Border */}
      <div className="absolute top-0 left-0 w-[100%] border-b-4 border-gray-200"></div>
      {/* Left-Side Dashboard */}
      <div className="absolute top-10 left-[2%] w-[65%] h-[15%] bg-gray-200 rounded-lg shadow-lg p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-lg font-semibold">
          Total P/L:{" "}
          <span className="ml-2 text-green-500">+5000</span>
        </h2>
      </div>
      {/* Header: Strategy Templates with View All Link */}
      <div className="absolute top-[20%] left-[2%] w-[65%] h-[70%]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Strategy Templates</h2>
          <a
            href="/dashboard/strategies/strategy_templates"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            View All
          </a>
        </div>

        {/* Display Strategy Templates */}
        <div className="grid grid-cols-2 gap-6">
          {templates.length > 0 ? (
            templates.map((template, index) => (
              <StrategyTemplate
                key={index}
                name={template.name}
                successRate={template.successRate}
                instrument={template.Instrument}
                strategyType={template.strategyType}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center">No templates available.</p>
          )}
        </div>
      </div>

      {/* Right-Side Dashboard: Deployed Strategies with View All Link */}
      <div className="absolute top-10 left-[72%] w-[30%] h-[200vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Deployed Strategies</h2>
          <a
            href="/dashboard/strategies/deployed_strategies"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            View All
          </a>
        </div>
        {/* Displaying Deployed Strategy Templates */}
        <div className="space-y-4">
          {strategies.length > 0 ? (
            strategies.map((strategy, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 className="font-bold text-lg">{strategy.strategy_name}</h3>
                  <p className="text-sm text-gray-500">Instrument: {strategy.selected_instrument}</p>
                </div>
                <p
                  className={`font-bold text-lg ${
                    strategy.overall_profit_or_loss >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {strategy.overall_profit_or_loss >= 0
                    ? `+${strategy.overall_profit_or_loss}`
                    : strategy.overall_profit_or_loss}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No strategies deployed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;



