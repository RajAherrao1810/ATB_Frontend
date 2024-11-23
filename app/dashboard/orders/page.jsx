"use client";

import React, { useState, useEffect } from "react";

const Orders = () => {
  const [positions, setPositions] = useState([]);

  // Fetch orders from the FastAPI backend
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/order_book");
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Periodically fetch data every second
  useEffect(() => {
    fetchOrders(); // Initial fetch
    const interval = setInterval(fetchOrders, 1000); // Fetch every 1 second
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Calculate total profit/loss
  const totalPL = positions.reduce((acc, position) => acc + position.pl, 0);

  return (
    <div className="p-6 bg-gray-100 h-[100vh]">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Current Positions</h1>

      {/* Total Profit/Loss Display */}
      <div className="mb-6 p-4 bg-white shadow-lg rounded-lg flex items-center justify-between">
        <h2 className="text-xl font-bold">Total Profit/Loss</h2>
        <p
          className={`text-2xl font-semibold ${
            totalPL >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {totalPL >= 0 ? "+" : ""}
          {totalPL.toFixed(2)}
        </p>
      </div>

      {/* Table for Positions */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-6 text-left">Symbol</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Avg Price</th>
              <th className="py-3 px-6 text-left">Current Price</th>
              <th className="py-3 px-6 text-left">P/L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr
                key={index}
                className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="py-3 px-6">{position.symbol}</td>
                <td className="py-3 px-6">{position.quantity}</td>
                <td className="py-3 px-6">${position.avgPrice.toFixed(2)}</td>
                <td className="py-3 px-6">${position.currentPrice.toFixed(2)}</td>
                <td
                  className={`py-3 px-6 font-semibold ${
                    position.pl >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {position.pl >= 0 ? "+" : ""}
                  {position.pl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
