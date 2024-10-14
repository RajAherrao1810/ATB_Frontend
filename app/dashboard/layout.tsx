"use client";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";
import "../globals.css";

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

// Sample data for indices (you can replace this with actual LTP data)
const indices = [
  { name: "Nifty", ltp: 18800 },
  { name: "BankNifty", ltp: 43000 },
  { name: "Sensex", ltp: 63500 },
  { name: "MidCpNifty", ltp: 31000 },
  { name: "Bankex", ltp: 36000 },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="dashboard-container min-h-screen bg-gray-100">
          {/* Navigation Bar */}
          <nav className="dashboard-nav bg-gray-100 text-black shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  {/* Display Indices LTP */}
                  <div className="flex space-x-4 mr-6">
                    {indices.map((index) => (
                      <div
                        key={index.name}
                        className="bg-gray-200 px-1 py-1 rounded-md shadow-md"
                      >
                        <span className="text-sm font-semibold">
                          {index.name}: {index.ltp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-300 hover:text-white focus:outline-none"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
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

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden bg-gray-800">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link href="/dashboard/homePage">
                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                      Home
                    </span>
                  </Link>
                  <Link href="/dashboard/strategies">
                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                      Strategies
                    </span>
                  </Link>
                  <Link href="/dashboard/orders">
                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                      Orders
                    </span>
                  </Link>
                  <Link href="/dashboard/account">
                    <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                      Account
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Main Content */}
          <main className="dashboard-main-content p-6">
            {/* Render Children Components */}
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}