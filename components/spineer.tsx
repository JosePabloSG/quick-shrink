import { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "" : prevDots + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gravel">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-water-leaf border-opacity-20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-violet border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-blue-violet text-xl font-semibold mb-2 transition-opacity duration-300">
        Shortening your link{dots}
      </p>
      <div className="w-64 h-2 bg-dull-lavender bg-opacity-20 rounded-full overflow-hidden">
        <div className="h-full bg-blue-violet animate-pulse rounded-full"></div>
      </div>
    </div>
  );
}

