
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProgressTrackerProps {
  progressPercentage: number;
  marketCap: number;
  targetCap: number;
}

const ProgressTracker = ({ progressPercentage, marketCap, targetCap }: ProgressTrackerProps) => {
  const milestones = [
    { name: "Launch", cap: 1000000, description: "Out of Earth's orbit" },
    { name: "Moon", cap: 10000000, description: "Lunar checkpoint reached" },
    { name: "Asteroid Belt", cap: 33000000, description: "Navigating space debris" },
    { name: "Red Zone", cap: 50000000, description: "Approaching Mars vicinity" },
    { name: "Mars Landing", cap: 100000000, description: "Mission accomplished!" },
  ];

  const getCurrentMilestone = () => {
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (marketCap >= milestones[i].cap) {
        return { ...milestones[i], index: i, isCompleted: true };
      }
    }
    return { ...milestones[0], index: 0, isCompleted: false };
  };

  const getNextMilestone = () => {
    for (let i = 0; i < milestones.length; i++) {
      if (marketCap < milestones[i].cap) {
        return milestones[i];
      }
    }
    return milestones[milestones.length - 1];
  };

  const currentMilestone = getCurrentMilestone();
  const nextMilestone = getNextMilestone();

  return (
    <Card className="bg-black/20 backdrop-blur-lg border-purple-500/30 p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
        
        {/* Progress Bar Section */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Mission Progress</h3>
            <span className="text-sm text-purple-300">
              {progressPercentage.toFixed(2)}% Complete
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg shadow-white/50 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Milestone Indicators */}
          <div className="flex justify-between text-xs">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.name} 
                className={`text-center ${
                  marketCap >= milestone.cap ? 'text-green-400' : 'text-gray-500'
                }`}
              >
                <div className={`w-2 h-2 mx-auto rounded-full mb-1 ${
                  marketCap >= milestone.cap ? 'bg-green-400' : 'bg-gray-600'
                }`} />
                <div>{milestone.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="lg:ml-8 space-y-4">
          <div className="text-center lg:text-right">
            <div className="text-sm text-purple-300 mb-1">Current Status</div>
            <div className="text-xl font-bold text-white mb-2">
              {currentMilestone.isCompleted ? `✅ ${currentMilestone.name}` : `🎯 Next: ${nextMilestone.name}`}
            </div>
            <div className="text-sm text-gray-300 mb-4">
              {currentMilestone.isCompleted ? currentMilestone.description : nextMilestone.description}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              🚀 Boost Rocket
            </Button>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400/10">
              📊 View Analytics
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              📱 Share Progress
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressTracker;
