
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-30 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🚀</span>
          </div>
          <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            To Mars
          </h1>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
          >
            Fuel the Rocket
          </Button>
          <Button 
            variant="outline" 
            className="border-purple-400 text-purple-300 hover:bg-purple-400/10"
          >
            Track Progress
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
