"use client"; 

import React, { useState, useEffect } from "react";

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch strategies
  async function fetchStrategies() {
    try {
      const res = await fetch("http://127.0.0.1:8000/deployed_strategy", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch strategies");
      }
      const data = await res.json();
      setStrategies(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchStrategies();

    // Set interval to fetch strategies every second
    const interval = setInterval(() => {
      fetchStrategies();
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading && strategies.length === 0) {
    return <p>Loading strategies...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1  gap-6 p-6 bg-gray-100">
      {strategies.map((strategy) => (
        <div
          key={strategy._id}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {/* Strategy Name and Profit/Loss */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">
              {strategy.strategy_name}
            </h2>
            <span
              className={`text-lg font-semibold ${
                strategy.overall_profit_or_loss > 0
                  ? "text-green-600"
                  : strategy.overall_profit_or_loss < 0
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {strategy.overall_profit_or_loss > 0
                ? `+₹${strategy.overall_profit_or_loss}`
                : `₹${strategy.overall_profit_or_loss}`}
            </span>
          </div>
  
          {/* Instrument Name, Status, and Button */}
          <div className="flex justify-between items-center text-gray-600">
            <span className="font-medium">Instrument: {strategy.selected_instrument}</span>
            <span
              className={`px-2 py-1 rounded-full text-white text-sm ${
                strategy.status === "running"
                  ? "bg-green-500"
                  : strategy.status === "closed"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {strategy.status}
            </span>
            <button
              className="bg-red-600 text-white text-sm py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() =>
                alert(`Viewing details for ${strategy.strategy_name}`)
              }
            >
              Exit Strategy
            </button>
          </div>
        </div>
      ))}
    </div>
  );  
}
