"use client"; // Use this to enable client-side rendering
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const App = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to My Strategies page when this component mounts
    router.push('/dashboard/strategies/my_strategies');
  }, [router]);

  return (
    <div className="h-[200vh] bg-gray-100 relative">
      {/* Horizontal Border */}
      <div className="absolute top-0 left-0 w-[100%] border-b-4 border-gray-200"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Redirecting to My Strategies...
      </div>
    </div>
  );
};

export default App;
