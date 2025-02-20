"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StrategyTemplate = ({
  name,
  instrument,
  strategyType,
  entryTime,
  exitTime,
  onEdit,
  onDelete,
  onDeploy,
}) => {
  // State to toggle the visibility of the menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle function to show/hide the menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md flex flex-col justify-between text-black h-[250px] w-[90%]">
      {/* Header: Strategy Name and 3-dot menu */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{name}</h2>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>

          {/* Toggle Menu for Edit and Delete */}
          {menuVisible && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg">
              <button
                onClick={onEdit}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Strategy Details */}
      <div className="mt-4">
        <p className="text-sm">
          <span className="font-semibold">Instrument:</span> {instrument}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Strategy Type:</span> {strategyType}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Entry Time:</span> {entryTime}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Exit Time:</span> {exitTime}
        </p>
      </div>


      {/* Deploy Strategy Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={onDeploy}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Deploy Strategy
        </button>
      </div>
    </div>
  );
};

const StrategiesGrid = () => {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch strategies from FastAPI endpoint
  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/my_strategies');
        setStrategies(response.data.strategies);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategies();
  }, []);

  const handleEdit = (id) => {
    // Handle edit action
    console.log("Editing strategy:", id);
  };

  const handleDelete = async (name, instrument) => {
    try {
      // Send DELETE request to the backend
      const response = await axios.delete('http://localhost:8000/delete_strategy', {
        data: {
          strategyName: name,
          instrument: instrument,
        },
      });
  
      // Log the success message
      console.log(response.data.message);
  
      // Reload the page to reflect the changes
      window.location.reload();
  
    } catch (error) {
      console.error("Error deleting strategy:", error);
      alert("Error deleting strategy: " + error.response.data.detail);
    }
  };
  

  const handleDeploy = async (deployedStrategy) => {
    console.log("Submitting strategy:", deployedStrategy);

    try {
      const response = await axios.post("http://localhost:8000/deployed_strategies", deployedStrategy);
      const { id } = response.data;
      console.log("Strategy Created:");

      // Pass the `id` to Deploy_StrategiesPage
      router.push(`/dashboard/strategies/deployed_strategies`);
    } catch (error) {
      console.error("Error creating strategy:", error);
    }
  };

  if (loading) {
    return <div>Loading strategies...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {strategies.map((strategy) => (
        <StrategyTemplate
          key={strategy._id}
          name={strategy.strategyName}
          instrument={strategy.selectedInstrument}
          strategyType={strategy.strategyType}
          entryTime={strategy.entryTime}
          exitTime={strategy.exitTime}
          onEdit={() => handleEdit(strategy._id)}
          onDelete={() => handleDelete(strategy._id)}
          onDeploy={() => handleDeploy(strategy._id)}
        />
      ))}
    </div>
  );
};

export default StrategiesGrid;



// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";


// const StrategyTemplate = ({
//   name,
//   instrument,
//   strategyType,
//   entryTime,
//   exitTime,
//   onEdit,
//   onDelete,
//   onDeploy,
// }) => {
//   return (
//     <div className="relative bg-white p-4 rounded-lg shadow-md flex flex-col justify-between text-black h-[250px] w-[100%]">
//       {/* Header: Strategy Name and 3-dot menu */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-bold text-lg">{name}</h2>
//         <Menu as="div" className="relative">
//           <Menu.Button className="text-gray-600 hover:text-gray-800">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z"
//               />
//             </svg>
//           </Menu.Button>
//           <Menu.Items className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg">
//             <Menu.Item>
//               {({ active }) => (
//                 <button
//                   onClick={onEdit}
//                   className={`${
//                     active ? "bg-gray-100" : ""
//                   } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
//                 >
//                   Edit
//                 </button>
//               )}
//             </Menu.Item>
//             <Menu.Item>
//               {({ active }) => (
//                 <button
//                   onClick={onDelete}
//                   className={`${
//                     active ? "bg-gray-100" : ""
//                   } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
//                 >
//                   Delete
//                 </button>
//               )}
//             </Menu.Item>
//           </Menu.Items>
//         </Menu>
//       </div>

//       {/* Strategy Details */}
//       <div className="mt-4">
//         <p className="text-sm">
//           <span className="font-semibold">Instrument:</span> {instrument}
//         </p>
//         <p className="text-sm">
//           <span className="font-semibold">Strategy Type:</span> {strategyType}
//         </p>
//         <p className="text-sm">
//           <span className="font-semibold">Entry Time:</span> {entryTime}
//         </p>
//         <p className="text-sm">
//           <span className="font-semibold">Exit Time:</span> {exitTime}
//         </p>
//       </div>

//       {/* Deploy Strategy Button */}
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={onDeploy}
//           className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Deploy Strategy
//         </button>
//       </div>
//     </div>
//   );
// };

// const MyStrategiesPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const strategyId = searchParams.get("strategyId");

//   const [strategies, setStrategies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(null); // To track which menu is open

//   // Load strategies from localStorage only on the client side
//   useEffect(() => {
//     const savedStrategies = localStorage.getItem("strategies");
//     if (savedStrategies) {
//       setStrategies(JSON.parse(savedStrategies));
//     }
//   }, []);

//   useEffect(() => {
//     const fetchStrategy = async () => {
//       if (!strategyId) return;
//       if (strategies.some((strategy) => strategy._id === strategyId)) return;

//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:8000/strategy/${strategyId}`);
//         const newStrategy = response.data.strategy;
//         const updatedStrategies = [...strategies, newStrategy];
//         setStrategies(updatedStrategies);
//         localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
//       } catch (err) {
//         setError("Error fetching strategy details");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStrategy();
//   }, [strategyId, strategies]);

//   const handleDelete = async (id) => {
//     try {
//       // Update local state before deleting on server
//       const updatedStrategies = strategies.filter((strategy) => strategy._id !== id);
//       setStrategies(updatedStrategies);
//       localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
//       console.log(`deleted strategy`);

//       // Send DELETE request to FastAPI server
//       await axios.delete(`http://localhost:8000/strategy/${id}`);

//       // Close menu after deletion
//       setMenuOpen(null);

//       console.log(`Strategy with ID ${id} successfully deleted from the database.`);
//     } catch (error) {
//       setError("Error deleting strategy from the server");
//       console.error("Error deleting strategy:", error);
//     }
//   };

  // const handleDeploy = async (deployedStrategy) => {
  //   console.log("Submitting strategy:", deployedStrategy);

  //   try {
  //     const response = await axios.post("http://localhost:8000/deployed_strategies", deployedStrategy);
  //     const { id } = response.data;
  //     console.log("Strategy Created:");

  //     // Pass the `id` to Deploy_StrategiesPage
  //     router.push(`/dashboard/strategies/deployed_strategies`);
  //   } catch (error) {
  //     console.error("Error creating strategy:", error);
  //   }
  // };

//   const toggleMenu = (id) => {
//     setMenuOpen(menuOpen === id ? null : id); // Toggle menu for the specific strategy
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">My Strategies</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {strategies.length > 0 ? (
//           strategies.map((strategy) => (
//             <div key={strategy._id} className="bg-white shadow-md rounded-lg p-6 relative border border-gray-200">
//               {/* Strategy Header with Menu */}
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold">{strategy.strategyName}</h2>
//                 <div className="relative">
//                   <button onClick={() => toggleMenu(strategy._id)} className="text-gray-500">
//                     &#x22EE; {/* Three dot menu */}
//                   </button>
//                   {menuOpen === strategy._id && (
//                     <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                       <button
//                         onClick={() => handleDelete(strategy._id)}
//                         className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => router.push({
//                           pathname: "/create_strategy",
//                           query: {
//                             strategyName: "",
//                             description: "",
//                             parameters: "",
//                             selectedInstrument: "",
//                             strategyType: "",
//                             orderType: "",
//                             entryTime: "09:15",
//                             exitTime: "15:15",
//                             legs: [],
//                             riskManagement: {
//                               profitExit: "",
//                               lossExit: "",
//                               exitTime: "15:15",
//                             },
//                             advancedFeatures: {
//                               cycles: "",
//                               wait_trade: { up_percentage: "", down_percentage: ""},
//                             },
//                           }
//                         })}
//                         className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <hr className="my-3 border-gray-300" />
              
//               {/* Strategy Details */}
//               <div className="text-sm space-y-1">
//                 <p><strong>Instrument:</strong> {strategy.selectedInstrument || "N/A"}</p>
//                 <p><strong>Strategy Type:</strong> {strategy.strategyType || "N/A"}</p>
//                 <p><strong>Entry Time:</strong> {strategy.entryTime || "N/A"}</p>
//                 <p><strong>Exit Time:</strong> {strategy.exitTime || "N/A"}</p>
//               </div>
//               <hr className="my-3 border-gray-300" />

//               {/* Deploy Button */}
//               <div className="flex space-x-2 mt-4">
//                 <button
//                   onClick={() => handleDeploy(strategy)}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
//                 >
//                   Deploy Strategy
//                 </button>
//                 <button
//                   onClick={() => console.log(`Backtesting strategy with ID: ${strategy._id}`)}
//                   className="w-full bg-blue-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-medium"
//                 >
//                   Backtest
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No strategy details found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyStrategiesPage;
