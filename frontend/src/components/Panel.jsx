import React from 'react';
import cd from "../assets/icons/cd.png";
import disk from "../assets/icons/drive.png";
import comp from "../assets/icons/computer.png";
import code from "../assets/icons/code.png";
import Terminal from './Terminal';

function Panel() {
  const [showTerminal, setShowTerminal] = React.useState(false);

  return (
    <div className="flex items-center justify-center bg-white w-full shadow-lg py-2 sm:py-3 md:py-4 lg:py-6 border-t-4 border-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 80" preserveAspectRatio="none">
          <line x1="0" y1="15" x2="800" y2="15" stroke="#f97316" strokeWidth="8" className="opacity-70" />
          <line x1="0" y1="30" x2="800" y2="30" stroke="#facc15" strokeWidth="8" className="opacity-70" />
          <line x1="0" y1="45" x2="800" y2="45" stroke="#fb7185" strokeWidth="8" className="opacity-70" />
          <line x1="0" y1="60" x2="800" y2="60" stroke="#0d9488" strokeWidth="8" className="opacity-70" />
        </svg>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-between space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 relative z-20 w-full max-w-7xl px-1 sm:px-2 md:px-4">
        {/* Grid Icon */}
        <div className="flex-shrink-0">
          <div className="bg-white p-1 sm:p-2 md:p-3 rounded-md shadow-md hover:shadow-lg cursor-pointer border border-gray-200 hover:scale-110 transition-transform duration-200">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="8" height="8" rx="2" />
              <rect x="14" y="2" width="8" height="8" rx="2" />
              <rect x="2" y="14" width="8" height="8" rx="2" />
              <rect x="14" y="14" width="8" height="8" rx="2" />
            </svg>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-[150px] sm:max-w-[250px] md:max-w-[400px] lg:max-w-[480px]">
          <div className="flex items-center bg-white w-full px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-2 md:py-3 rounded-full shadow-lg border-2 border-pink-200 hover:border-pink-300 transition-colors">
            <div className="text-orange-400 mr-1 sm:mr-2 md:mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-xs sm:text-sm md:text-base text-gray-700 placeholder-gray-400 font-medium min-w-0"
            />
          </div>
        </div>

       { /* Retro Action Icons */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 m-1">
              <img src={cd} alt="CD Icon" className="w-3 h-4 sm:w-4 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 hover:scale-125 transition-transform cursor-pointer" />
              <img src={disk} alt="Disk Icon" className="w-3 h-4 sm:w-4 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 hover:scale-125 transition-transform cursor-pointer" />
              <img src={comp} alt="Computer Icon" className="w-3 h-4 sm:w-4 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 hover:scale-125 transition-transform cursor-pointer" />
              <img
                src={code}
                alt="Code Icon"
                className="w-3 h-4 sm:w-4 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 hover:scale-125 transition-transform cursor-pointer"
                onClick={() => setShowTerminal(true)}
              />
              {/* Extra icons for longer row - hidden on mobile */}
              <img
                src={cd}
                alt="Extra CD Icon"
                className="hidden sm:block w-4 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
              />
              <img
                src={disk}
                alt="Extra Disk Icon"
                className="hidden md:block w-6 h-6 lg:w-8 lg:h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
              />
              <img
                src={comp}
                alt="Extra Computer Icon"
                className="hidden md:block w-6 h-6 lg:w-8 lg:h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
              />
              <img
                src={code}
                alt="Extra Code Icon"
                className="hidden lg:block w-8 h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
                onClick={() => setShowTerminal(true)}
              />
            </div>
          </div>
              </div>

              {/* Terminal Modal */}
      {showTerminal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-100 p-2">
          <div className="max-w-4xl w-full mx-2 sm:mx-4 p-1 max-h-[95vh] overflow-hidden">
            <Terminal onClose={() => setShowTerminal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Panel;
