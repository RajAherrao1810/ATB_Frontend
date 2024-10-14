"use client";
import localFont from "next/font/local";
import Link from "next/link";
import { useState } from "react";
import "../../globals.css";

const geistSans = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function StrategiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="strategies-container min-h-screen bg-gray-100 flex">
      {/* Vertical Navigation Bar */}
      <nav className="strategies-nav bg-gray-100 text-black shadow-lg w-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between h-full">
            <div className="py-6">
              {/* Menu Items */}
              <div className="flex flex-col space-y-4">
                <Link href="/dashboard/strategies/my_strategies">
                  <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                    My Strategies
                  </span>
                </Link>
                <Link href="/dashboard/strategies/strategy_templates">
                  <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                    Strategy Templates
                  </span>
                </Link>
                <Link href="/dashboard/strategies/create_strategy">
                  <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Create Strategy
                  </span>
                </Link>
                <Link href="/dashboard/strategies/deployed_strategies">
                  <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Deployed Strategies
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="strategies-main-content flex-grow p-6">
        {children}
      </main>
    </div>
  );
}
