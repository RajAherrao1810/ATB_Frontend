import React from 'react';

const App = () => {
  return (
    <div className="h-[200vh] bg-gray-100 relative">
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
          <div className="absolute left-0 w-[47%] h-[40%] bg-blue-500 flex items-center justify-center text-white font-semibold">Template 1</div>
          <div className="absolute left-[54%] w-[47%] h-[40%] bg-blue-500 flex items-center justify-center text-white font-semibold">Template 2</div>
          <div className="absolute top-[55%] left-0 w-[47%] h-[40%] bg-blue-500 flex items-center justify-center text-white font-semibold">Template 3</div>
          <div className="absolute top-[55%] left-[54%] w-[47%] h-[40%] bg-blue-500 flex items-center justify-center text-white font-semibold">Template 4</div>
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
