"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const DeployedStrategies = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const strategyId = searchParams.get("strategyId");

  const [deployedStrategies, setDeployedStrategies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // useRef to track fetched strategy IDs and avoid duplicate fetches
  const fetchedStrategies = useRef(new Set());

  useEffect(() => {
    const storedStrategies = JSON.parse(localStorage.getItem("deployed_strategies")) || [];
    const uniqueStrategies = removeDuplicates(storedStrategies);
    setDeployedStrategies(uniqueStrategies);
    localStorage.setItem("deployed_strategies", JSON.stringify(uniqueStrategies));

    uniqueStrategies.forEach(strategy => fetchedStrategies.current.add(strategy._id));
  }, []);

  // Helper function to remove duplicate strategies based on _id
  const removeDuplicates = (strategies) => {
    const uniqueStrategies = [];
    const seenIds = new Set();

    strategies.forEach(strategy => {
      if (!seenIds.has(strategy._id)) {
        uniqueStrategies.push(strategy);
        seenIds.add(strategy._id);
      }
    });

    return uniqueStrategies;
  };

  useEffect(() => {
    const fetchStrategy = async () => {
      if (!strategyId) return;

      if (fetchedStrategies.current.has(strategyId)) {
        setMessage("Strategy already deployed");
        return;
      }

      try {
        setLoading(true);
        setMessage("");
        const response = await axios.get(`http://localhost:8000/deployed_strategies/${strategyId}`);
        const newStrategy = response.data.strategy;

        // Set default status to "Running" if not specified
        newStrategy.status = newStrategy.isLive ? "Running" : newStrategy.status || "Running";

        setDeployedStrategies(prevStrategies => {
          const updatedStrategies = removeDuplicates([...prevStrategies, newStrategy]);
          localStorage.setItem("deployed_strategies", JSON.stringify(updatedStrategies));
          return updatedStrategies;
        });

        fetchedStrategies.current.add(strategyId);
      } catch (err) {
        setError("Error fetching strategy details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategy();
  }, [strategyId]);

  const handleExitStrategy = (id) => {
    const updatedStrategies = deployedStrategies.filter(strategy => strategy._id !== id);
    setDeployedStrategies(updatedStrategies);
    localStorage.setItem("deployed_strategies", JSON.stringify(updatedStrategies));
    
    fetchedStrategies.current.delete(id);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setDeployedStrategies([]); // Optional: Clear state if you want to reset the display as well
    setMessage("Local storage cleared");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 py-8 px-4">
      <button
        onClick={clearLocalStorage}
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
      >
        Clear Local Storage
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Deployed Strategies</h1>
      {error && (
        <div className="text-red-500 mb-4 font-semibold text-center">
          {error}
        </div>
      )}
      {message && (
        <div className="text-blue-500 mb-4 font-semibold text-center">
          {message}
        </div>
      )}
      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>
      ) : (
        <>
          {deployedStrategies.length === 0 ? (
            <div className="items-center justify-center text-2xl text-gray-600 font-semibold text-center">
              No strategy deployed
            </div>
          ) : (
            <div className="mx-auto w-[70%] space-y-6">
              {deployedStrategies.map((strategy) => (
                <div
                  key={strategy._id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      {strategy.strategyName}
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
                    <div className="flex items-center space-x-4">
                      <p className="text-gray-600 font-semibold">
                        Instrument - {strategy.selectedInstrument} 
                      </p>
                      <span
                        className={`font-semibold ${
                          strategy.status === "Running" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        status- {strategy.status}
                      </span>
                      {strategy.status === "Running" && (
                        <button
                          onClick={() => handleExitStrategy(strategy._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg transition-colors"
                        >
                          Exit Strategy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeployedStrategies;
