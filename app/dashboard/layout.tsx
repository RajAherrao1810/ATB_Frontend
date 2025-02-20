"use client";
import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import "../globals.css";

// Define the types for the props
interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Define the type for each item in the LTP data (fetched from MongoDB)
interface LtpData {
  Symbol: string;
  LTP: number;
  Cls: number;
}

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Sample initial data for indices (replace with actual LTP data from MongoDB)
const initialIndices = [
  { name: "Nifty", ltp: 18800, prevLtp: 18750 },
  { name: "BankNifty", ltp: 43000, prevLtp: 43200 },
  { name: "Sensex", ltp: 63500, prevLtp: 63400 },
  { name: "MidCpNifty", ltp: 31000, prevLtp: 30900 },
  { name: "Bankex", ltp: 36000, prevLtp: 36050 },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [indices, setIndices] = useState(initialIndices);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Function to fetch LTP data from MongoDB API
    async function fetchLtpData() {
      try {
        const response = await fetch("/api/getLTP");
        if (response.ok) {
          const data: LtpData[] = await response.json(); // Type the fetched data as LtpData[]
          // Format the data to match `indices` structure
          const updatedIndices = data.map((item) => ({
            name: item.Symbol,
            ltp: item.LTP,
            prevLtp: item.Cls,
          }));

          setIndices(updatedIndices);
        } else {
          console.error("Failed to fetch LTP data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Fetch the data initially and then at regular intervals
    fetchLtpData();
    const interval = setInterval(fetchLtpData, 1000); // Fetch every 10 seconds make it 1 during actual implementation

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="dashboard-container min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="dashboard-nav bg-gray-100 text-black shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                {/* Display Indices LTP and Changes */}
                <div className="flex space-x-4 mr-6">
                  {indices.map((index) => {
                    const valueChange = parseFloat(
                      (index.ltp - index.prevLtp).toFixed(2)
                    );
                    const percentageChange = (
                      (valueChange / index.prevLtp) *
                      100
                    ).toFixed(2);
                    const changeColor =
                      valueChange > 0 ? "text-green-500" : "text-red-500";

                    return (
                      <div
                        key={index.name}
                        className="bg-gray-200 px-1 py-1 rounded-md shadow-md w-40 h-14 flex flex-col"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm font-semibold">{index.name}:</span>                          
                        </div>
                        <div>
                          <span className="text-xs ">{index.ltp}  </span>
                          <span className={`text-xs ${changeColor}`}>   {valueChange > 0 ? "+" : ""}{valueChange} ({percentageChange}%)</span>                          
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-6">
                  {/* Home Page */}
                  <Link href="/dashboard/homePage">
                    <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                      Home
                    </span>
                  </Link>

                  {/* Strategies */}
                  <Link href="/dashboard/strategies">
                    <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                      Strategies
                    </span>
                  </Link>

                  {/* Orders */}
                  <Link href="/dashboard/orders">
                    <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                      Orders
                    </span>
                  </Link>

                  {/* Account Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    >
                      Account
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg z-10">
                        <Link href="/dashboard/account">
                          <span className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                            Profile
                          </span>
                        </Link>
                        <Link href="/dashboard/account/settings">
                          <span className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer">
                            Settings
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="dashboard-main-content p-6">
          {/* Render Children Components */}
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
