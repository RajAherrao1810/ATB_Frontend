"use client";
import localFont from "next/font/local";
import Link from "next/link";
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
  return (
    <div className="strategies-container min-h-screen bg-gray-100">
      {/* Horizontal Navigation Bar */}
      <nav className="strategies-nav bg-gray-100 text-black shadow-lg w-full flex justify-center py-4">
        <div className="flex space-x-8">
          <Link href="/dashboard/orders/open_orders">
            <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Open Orders
            </span>
          </Link>
          <Link href="/dashboard/orders/positions">
            <span className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
              Positions
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="strategies-main-content flex-grow p-6">
        {children}
      </main>
    </div>
  );
}
