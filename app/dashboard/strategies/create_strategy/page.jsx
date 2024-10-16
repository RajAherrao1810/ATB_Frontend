"use client";
import { useState, useCallback } from "react";
import Link from "next/link";

const instruments = ["Nifty", "BankNifty", "Sensex", "MidCpNifty", "Bankex"];
const expiries = {
  Nifty: ["25-Oct-2024", "01-Nov-2024"],
  BankNifty: ["25-Oct-2024", "01-Nov-2024"],
  // Add more expiries for each instrument
};

// Reusable Leg Form Component
const LegForm = ({ leg, index, handleLegChange, handleDeleteLeg, expiries }) => (
  <div className="flex items-center space-x-4 mb-2">
    {[
      { label: "Buy/Sell", name: "buyOrSell", type: "select", options: ["Buy", "Sell"] },
      { label: "Lots", name: "lots", type: "number" },
      { label: "Expiry", name: "expiry", type: "select", options: expiries },
      { label: "CE/PE", name: "optionType", type: "select", options: ["CE", "PE"] },
      { label: "Strike Price", name: "strikePrice", type: "number" },
      { label: "SL%", name: "slPercent", type: "number" },
      { label: "EP%", name: "epPercent", type: "number" },
    ].map(({ label, name, type, options }) => (
      <div key={name}>
        <label className="block text-gray-700 text-sm">{label}</label>
        {type === "select" ? (
          <select
            value={leg[name]}
            onChange={(e) => handleLegChange(index, name, e.target.value)}
            className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
            required
          >
            <option value="">-- Select --</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={leg[name]}
            onChange={(e) => handleLegChange(index, name, e.target.value)}
            className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
            required
          />
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={() => handleDeleteLeg(index)}
      className="bg-red-500 text-white px-4 py-2 rounded-md"
    >
      Delete Leg
    </button>
  </div>
);

const CreateStrategy = () => {
  const [strategy, setStrategy] = useState({
    strategyName: "",
    description: "",
    parameters: "",
    selectedInstrument: "",
    strategyType: "",
    orderType: "",
    entryTime: "09:15",
    exitTime: "15:15",
    legs: [],
    riskManagement: {
      profitExit: "",
      lossExit: "",
      exitTime: "15:15",
    },
  });

  const handleChange = (field, value) => {
    setStrategy((prev) => ({ ...prev, [field]: value }));
  };

  const handleRiskManagementChange = (field, value) => {
    setStrategy((prev) => ({
      ...prev,
      riskManagement: { ...prev.riskManagement, [field]: value },
    }));
  };

  const handleAddLeg = useCallback(() => {
    setStrategy((prev) => ({
      ...prev,
      legs: [
        ...prev.legs,
        { buyOrSell: "", lots: 1, expiry: "", optionType: "", strikePrice: "", slPercent: "", epPercent: "" },
      ],
    }));
  }, [setStrategy]);

  const handleLegChange = useCallback(
    (index, field, value) => {
      const updatedLegs = strategy.legs.map((leg, legIndex) =>
        legIndex === index ? { ...leg, [field]: value } : leg
      );
      setStrategy((prev) => ({ ...prev, legs: updatedLegs }));
    },
    [strategy.legs]
  );

  const handleDeleteLeg = useCallback(
    (index) => {
      const updatedLegs = strategy.legs.filter((_, legIndex) => legIndex !== index);
      setStrategy((prev) => ({ ...prev, legs: updatedLegs }));
    },
    [strategy.legs]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Strategy Created:", strategy);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Strategy</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <FormSelect
          label="Select Instrument"
          value={strategy.selectedInstrument}
          onChange={(e) => handleChange("selectedInstrument", e.target.value)}
          options={instruments}
        />

        <FormRadio
          label="Strategy Type"
          value={strategy.strategyType}
          onChange={(e) => handleChange("strategyType", e.target.value)}
          options={["Time Based", "Indicator Based"]}
        />

        <div className="flex items-center space-x-4 mb-4">
          <FormRadio
            label="Order Type"
            value={strategy.orderType}
            onChange={(e) => handleChange("orderType", e.target.value)}
            options={["Intraday", "Carryforward"]}
          />
          <TimeInput
            label="Entry Time"
            value={strategy.entryTime}
            onChange={(e) => handleChange("entryTime", e.target.value)}
          />
          {strategy.orderType === "Intraday" && (
            <TimeInput
              label="Exit Time"
              value={strategy.exitTime}
              onChange={(e) => handleChange("exitTime", e.target.value)}
            />
          )}
        </div>

        {strategy.strategyType === "Time Based" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Add Legs</label>
            {strategy.legs.map((leg, index) => (
              <LegForm
                key={index}
                leg={leg}
                index={index}
                handleLegChange={handleLegChange}
                handleDeleteLeg={handleDeleteLeg}
                expiries={expiries[strategy.selectedInstrument] || []}
              />
            ))}
            <button type="button" onClick={handleAddLeg} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
              Add Leg
            </button>
          </div>
        )}

        {/* Risk Management Section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Risk Management</label>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm">Exit when overall profit exceeds</label>
              <input
                type="number"
                value={strategy.riskManagement.profitExit}
                onChange={(e) => handleRiskManagementChange("profitExit", e.target.value)}
                placeholder="Enter profit percentage"
                className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm">Exit when overall loss exceeds</label>
              <input
                type="number"
                value={strategy.riskManagement.lossExit}
                onChange={(e) => handleRiskManagementChange("lossExit", e.target.value)}
                placeholder="Enter loss percentage"
                className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm">Exit time</label>
              <TimeInput
                label=""
                value={strategy.riskManagement.exitTime}
                onChange={(e) => handleRiskManagementChange("exitTime", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Create Strategy
          </button>
          <Link href="/" className="font-bold text-sm text-blue-500 hover:text-blue-800">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

// Common reusable components for input elements
const FormSelect = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
    >
      <option value="">-- Select --</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FormRadio = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    {options.map((option) => (
      <label key={option} className="inline-flex items-center mr-4">
        <input
          type="radio"
          value={option}
          checked={value === option}
          onChange={onChange}
          className="form-radio h-4 w-4 text-blue-600"
        />
        <span className="ml-2 text-gray-700">{option}</span>
      </label>
    ))}
  </div>
);

const TimeInput = ({ label, value, onChange }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
    <input
      type="time"
      value={value}
      onChange={onChange}
      className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
    />
  </div>
);

export default CreateStrategy;
