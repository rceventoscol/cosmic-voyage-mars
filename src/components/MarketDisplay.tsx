
import { Card } from '@/components/ui/card';

interface MarketDisplayProps {
  marketCap: number;
  targetCap: number;
  isLoading: boolean;
}

const MarketDisplay = ({ marketCap, targetCap, isLoading }: MarketDisplayProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const progressPercentage = (marketCap / targetCap) * 100;

  return (
    <Card className="bg-black/20 backdrop-blur-lg border-purple-500/30 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2">
          <h2 className="text-sm text-purple-300 font-medium">Current Mission Progress</h2>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-white">
              {formatCurrency(marketCap)}
            </span>
            <span className="text-lg text-purple-300">
              / {formatCurrency(targetCap)}
            </span>
          </div>
          <div className="text-sm text-green-400">
            {progressPercentage.toFixed(2)}% of the way to Mars
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="text-sm text-purple-300">Distance Traveled</div>
          <div className="text-xl font-bold text-blue-400">
            {(progressPercentage * 2.25).toFixed(1)}M km
          </div>
          <div className="text-xs text-gray-400">
            {isLoading ? 'Updating...' : 'Live tracking'}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MarketDisplay;
