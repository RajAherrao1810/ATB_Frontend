"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const MyStrategiesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const strategyId = searchParams.get("strategyId");

  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null); // To track which menu is open

  // Load strategies from localStorage only on the client side
  useEffect(() => {
    const savedStrategies = localStorage.getItem("strategies");
    if (savedStrategies) {
      setStrategies(JSON.parse(savedStrategies));
    }
  }, []);

  useEffect(() => {
    const fetchStrategy = async () => {
      if (!strategyId) return;
      if (strategies.some((strategy) => strategy._id === strategyId)) return;

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/strategy/${strategyId}`);
        const newStrategy = response.data.strategy;
        const updatedStrategies = [...strategies, newStrategy];
        setStrategies(updatedStrategies);
        localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
      } catch (err) {
        setError("Error fetching strategy details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategy();
  }, [strategyId, strategies]);

  const handleDelete = async (id) => {
    try {
      // Update local state before deleting on server
      const updatedStrategies = strategies.filter((strategy) => strategy._id !== id);
      setStrategies(updatedStrategies);
      localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
      console.log(`deleted strategy`);

      // Send DELETE request to FastAPI server
      await axios.delete(`http://localhost:8000/strategy/${id}`);

      // Close menu after deletion
      setMenuOpen(null);

      console.log(`Strategy with ID ${id} successfully deleted from the database.`);
    } catch (error) {
      setError("Error deleting strategy from the server");
      console.error("Error deleting strategy:", error);
    }
  };

  const handleDeploy = async (deployedStrategy) => {
    console.log("Submitting strategy:", deployedStrategy);

    try {
      const response = await axios.post("http://localhost:8000/deployed_strategies", deployedStrategy);
      const { id } = response.data;
      console.log("Strategy Created:");

      // Pass the `id` to Deploy_StrategiesPage
      router.push(`/dashboard/strategies/deployed_strategies?strategyId=${id}`);
    } catch (error) {
      console.error("Error creating strategy:", error);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id); // Toggle menu for the specific strategy
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Strategies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {strategies.length > 0 ? (
          strategies.map((strategy) => (
            <div key={strategy._id} className="bg-white shadow-md rounded-lg p-6 relative border border-gray-200">
              {/* Strategy Header with Menu */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{strategy.strategyName}</h2>
                <div className="relative">
                  <button onClick={() => toggleMenu(strategy._id)} className="text-gray-500">
                    &#x22EE; {/* Three dot menu */}
                  </button>
                  {menuOpen === strategy._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => handleDelete(strategy._id)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => console.log("Edit functionality to be implemented")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <hr className="my-3 border-gray-300" />
              
              {/* Strategy Details */}
              <div className="text-sm space-y-1">
                <p><strong>Instrument:</strong> {strategy.selectedInstrument || "N/A"}</p>
                <p><strong>Strategy Type:</strong> {strategy.strategyType || "N/A"}</p>
                <p><strong>Entry Time:</strong> {strategy.entryTime || "N/A"}</p>
                <p><strong>Exit Time:</strong> {strategy.exitTime || "N/A"}</p>
              </div>
              <hr className="my-3 border-gray-300" />

              {/* Deploy Button */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleDeploy(strategy)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Deploy Strategy
                </button>
                <button
                  onClick={() => console.log(`Backtesting strategy with ID: ${strategy._id}`)}
                  className="w-full bg-blue-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Backtest
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No strategy details found.</p>
        )}
      </div>
    </div>
  );
};

export default MyStrategiesPage;
