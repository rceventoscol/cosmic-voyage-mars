
import { useEffect, useState } from 'react';

interface SpaceshipProps {
  x: number;
  y: number;
  marketCap: number;
  progressPercentage: number;
}

const Spaceship = ({ x, y, marketCap, progressPercentage }: SpaceshipProps) => {
  const [thrusterActive, setThrusterActive] = useState(false);

  useEffect(() => {
    // Activate thrusters when market cap increases significantly
    const interval = setInterval(() => {
      setThrusterActive(true);
      setTimeout(() => setThrusterActive(false), 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [marketCap]);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative">
        {/* Spaceship Body */}
        <div className="relative z-10">
          <svg width="40" height="20" viewBox="0 0 40 20" className="drop-shadow-lg">
            <defs>
              <linearGradient id="shipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="50%" stopColor="#6B7280" />
                <stop offset="100%" stopColor="#9CA3AF" />
              </linearGradient>
            </defs>
            {/* Main body */}
            <ellipse cx="20" cy="10" rx="18" ry="6" fill="url(#shipGradient)" />
            {/* Nose cone */}
            <ellipse cx="35" cy="10" rx="4" ry="3" fill="#D1D5DB" />
            {/* Cockpit */}
            <ellipse cx="25" cy="8" rx="3" ry="2" fill="#3B82F6" opacity="0.8" />
          </svg>
        </div>

        {/* Thruster Effect */}
        {thrusterActive && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
            <div className="w-8 h-3 bg-gradient-to-l from-transparent via-orange-400 to-blue-400 rounded-full animate-pulse opacity-80" />
            <div className="w-6 h-2 bg-gradient-to-l from-transparent via-yellow-300 to-white rounded-full absolute top-1/2 left-1 transform -translate-y-1/2 animate-pulse" />
          </div>
        )}

        {/* Ship Status Display */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-white whitespace-nowrap">
          🚀 {progressPercentage.toFixed(1)}% to Mars
        </div>

        {/* Ship Glow Effect */}
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm scale-150 animate-pulse" />
      </div>
    </div>
  );
};

export default Spaceship;
