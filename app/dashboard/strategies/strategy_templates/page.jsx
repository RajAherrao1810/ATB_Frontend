"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// StrategyTemplate Component
const StrategyTemplate = ({ name, successRate, instrument, strategyType, router }) => {
  const handleAddStrategy = async () => {
    try {
      // Send a POST request to FastAPI to fetch strategy details from strategy_templates
      const response = await axios.post("http://localhost:8000/add_strategy", {
        strategyName:name, 
        instrument:instrument
      });

      // If successful, navigate to 'my_strategies' page
      if (response.status === 200) {
        router.push("/dashboard/strategies/my_strategies"); // Redirect to the "my_strategies" page
      }
    } catch (error) {
      console.error("Error adding strategy:", error);
      alert("Error adding strategy: " + error.response?.data?.detail || "Unknown error");
    }
  };

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
        <button 
          onClick={handleAddStrategy}
          className="bg-gray-200 text-black font-bold py-2 px-4 rounded hover:bg-gray-500"
        >
          Add to My Strategy
        </button>
      </div>
    </div>
  );
};

// Main Component
const App = () => {
  const [templates, setTemplates] = useState([]);
  const router = useRouter();

  // Fetch strategy templates from FastAPI
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:8000/strategy_templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="h-full bg-gray-100 p-4">
      {/* Strategy Templates */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Strategy Templates</h2>
          <a href="/templates" className="text-blue-500 hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {templates.length > 0 ? (
            templates.map((template, index) => (
              <StrategyTemplate
                key={index}
                name={template.name}
                successRate={template.successRate}
                instrument={template.Instrument}
                strategyType={template.strategyType}
                router={router} // Pass router as a prop
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center">No templates available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
