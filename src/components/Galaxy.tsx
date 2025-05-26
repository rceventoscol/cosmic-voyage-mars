
import { useEffect, useRef, useState } from 'react';
import Spaceship from './Spaceship';

interface GalaxyProps {
  progressPercentage: number;
  marketCap: number;
}

const Galaxy = ({ progressPercentage, marketCap }: GalaxyProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom + (e.deltaY > 0 ? -zoomSpeed : zoomSpeed)));
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate spaceship position (0% = Earth, 100% = Mars)
  const spaceshipX = 15 + (progressPercentage / 100) * 70; // From 15% to 85% of container width

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="relative w-full h-full transition-transform duration-200"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        {/* Galaxy Background */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-transparent to-transparent" />
        
        {/* Earth */}
        <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full shadow-lg shadow-blue-400/50">
              <div className="absolute inset-2 bg-gradient-to-br from-green-300 to-blue-300 rounded-full opacity-80" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-300 font-medium">
              Earth
            </div>
          </div>
        </div>

        {/* Mars */}
        <div className="absolute right-[10%] top-1/2 transform -translate-y-1/2">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-400 rounded-full shadow-lg shadow-red-400/50">
              <div className="absolute inset-3 bg-gradient-to-br from-red-400 to-orange-300 rounded-full opacity-80" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-red-300 font-medium">
              Mars
            </div>
          </div>
        </div>

        {/* Journey Path */}
        <div className="absolute top-1/2 left-[18%] right-[18%] transform -translate-y-1/2">
          <svg className="w-full h-2" viewBox="0 0 100 2" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
            <line 
              x1="0" 
              y1="1" 
              x2={progressPercentage} 
              y2="1" 
              stroke="url(#pathGradient)" 
              strokeWidth="0.5"
              strokeDasharray="2,1"
              className="animate-pulse"
            />
            <line 
              x1={progressPercentage} 
              y1="1" 
              x2="100" 
              y2="1" 
              stroke="#374151" 
              strokeWidth="0.3"
              strokeDasharray="1,1"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Spaceship */}
        <Spaceship 
          x={spaceshipX} 
          y={50} 
          marketCap={marketCap}
          progressPercentage={progressPercentage}
        />

        {/* Milestone Markers */}
        {[10, 25, 50, 75, 90].map((milestone) => (
          <div
            key={milestone}
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${15 + (milestone / 100) * 70}%` }}
          >
            <div className={`w-3 h-3 rounded-full ${
              progressPercentage >= milestone 
                ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                : 'bg-gray-600'
            }`} />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
              {milestone}%
            </div>
          </div>
        ))}

        {/* Floating Data Points */}
        <div className="absolute left-1/3 top-1/4 bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
          <div className="text-xs text-purple-300">Mission Control</div>
          <div className="text-sm text-white font-bold">${(marketCap / 1000000).toFixed(1)}M</div>
        </div>

        <div className="absolute right-1/3 top-3/4 bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
          <div className="text-xs text-blue-300">Distance Remaining</div>
          <div className="text-sm text-white font-bold">{(225 - (progressPercentage * 2.25)).toFixed(1)}M km</div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setZoom(Math.min(3, zoom + 0.2))}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          −
        </button>
      </div>
    </div>
  );
};

export default Galaxy;
