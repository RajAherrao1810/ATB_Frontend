"use client";
import { useState, useEffect } from 'react';

const DeployedStrategies = () => {
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    const fetchDeployedStrategies = async () => {
      const mockStrategies = [
        {
          id: 1,
          name: "Nifty Intraday",
          totalPnL: 4500,
          isLive: true,
        },
        {
          id: 2,
          name: "BankNifty CarryForward",
          totalPnL: -2500,
          isLive: false,
        },
      ];
      setStrategies(mockStrategies);
    };

    fetchDeployedStrategies();
  }, []);

  const handleExitStrategy = (id) => {
    setStrategies((prevStrategies) =>
      prevStrategies.filter((strategy) => strategy.id !== id)
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Deployed Strategies</h1>
      {strategies.length === 0 ? (
        <div className="items-center justify-center text-2xl text-gray-600 font-semibold text-center">
          No strategy deployed
        </div>
      ) : (
        <div className="mx-auto w-[70%] space-y-6">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {strategy.name}
                </h2>
                <span
                  className={`text-lg font-semibold ${
                    strategy.totalPnL >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{strategy.totalPnL}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      strategy.isLive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {strategy.isLive ? "Live" : "Closed"}
                  </span>
                </p>
                {strategy.isLive && (
                  <button
                    onClick={() => handleExitStrategy(strategy.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Exit Strategy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeployedStrategies;
