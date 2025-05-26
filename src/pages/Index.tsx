
import { useState, useEffect } from 'react';
import Galaxy from '@/components/Galaxy';
import MarketDisplay from '@/components/MarketDisplay';
import ProgressTracker from '@/components/ProgressTracker';
import Navigation from '@/components/Navigation';
import ParticleField from '@/components/ParticleField';

const Index = () => {
  const [marketCap, setMarketCap] = useState(23500000); // Example: $23.5M
  const [isLoading, setIsLoading] = useState(false);

  // Simulate market cap updates (in real implementation, this would be from live API)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small market cap fluctuations
      setMarketCap(prev => {
        const change = (Math.random() - 0.5) * 100000; // Random change of ±$50k
        return Math.max(0, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const targetMarketCap = 100000000; // $100M target
  const progressPercentage = Math.min((marketCap / targetMarketCap) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleField />
      
      <Navigation />
      
      <div className="relative z-10 min-h-screen">
        <div className="absolute top-6 left-6 right-6 z-20">
          <MarketDisplay 
            marketCap={marketCap}
            targetCap={targetMarketCap}
            isLoading={isLoading}
          />
        </div>

        <div className="pt-32 pb-20">
          <Galaxy 
            progressPercentage={progressPercentage}
            marketCap={marketCap}
          />
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20">
          <ProgressTracker 
            progressPercentage={progressPercentage}
            marketCap={marketCap}
            targetCap={targetMarketCap}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
