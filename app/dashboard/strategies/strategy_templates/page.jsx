import React from "react";

const TemplatesPage = () => {
  return (
    <div className="min-h-[200vh] bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Templates</h1>
      
      {/* Grid of Square Containers */}
      <div className="grid grid-cols-3 gap-6">
        {/* Repeat these square divs for however many templates you want */}
        <div className="bg-blue-500 flex items-center justify-center text-white font-semibold h-[300px] w-[300px]">
          Template 1
        </div>
        <div className="bg-blue-500 flex items-center justify-center text-white font-semibold h-[300px] w-[300px]">
          Template 2
        </div>
        <div className="bg-blue-500 flex items-center justify-center text-white font-semibold h-[300px] w-[300px]">
          Template 3
        </div>
        <div className="bg-blue-500 flex items-center justify-center text-white font-semibold h-[300px] w-[300px]">
          Template 4
        </div>
        <div className="bg-blue-500 flex items-center justify-center text-white font-semibold h-[300px] w-[300px]">
          Template 5
        </div>
        <div className="bg-blue-500 flex items-center justify-center text-white font-semibold h-[300px] w-[300px]">
          Template 6
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
