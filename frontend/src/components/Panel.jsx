import React from 'react';
import cd from "../assets/icons/cd.png";
import disk from "../assets/icons/drive.png";
import comp from "../assets/icons/computer.png";
import code from "../assets/icons/code.png";
import Terminal from './Terminal';

function Panel() {
  const [showTerminal, setShowTerminal] = React.useState(false);
  const [showResume, setShowResume] = React.useState(false);

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
              {/* Extra icons for longer row - hidden on mobile */}
              <img
                src={cd}
                alt="Resume CD"
                className="hidden sm:block w-4 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
                onClick={() => setShowResume(true)}
              />
              {/* <img
                src={disk}
                alt="Extra Disk Icon"
                className="hidden md:block w-6 h-6 lg:w-8 lg:h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
              />
              <img
                src={comp}
                alt="Extra Computer Icon"
                className="hidden md:block w-6 h-6 lg:w-8 lg:h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
              /> */}
              <img
                src={code}
                alt="Extra Code Icon"
                className="hidden lg:block w-8 h-8 opacity-80 hover:scale-125 transition-transform cursor-pointer"
                onClick={() => setShowTerminal(true)}
              />
            </div>
          </div>
              </div>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2">
          <div className="draggable-window retro-window bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-gray-400 shadow-2xl w-[95%] max-w-4xl flex flex-col font-mono relative scanlines max-h-[95vh] overflow-hidden">
            
            {/* Window Title Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 sm:px-4 py-2 flex items-center justify-between border-b-2 border-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-xs sm:text-sm">Resume - Anisha_resume.pdf</span>
              </div>
              <div className="flex space-x-1">
                <button className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex items-center justify-center retro-button">
                  <span className="text-black text-xs">_</span>
                </button>
                <button className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex items-center justify-center retro-button">
                  <span className="text-black text-xs">□</span>
                </button>
                <button 
                  onClick={() => setShowResume(false)}
                  className="w-5 h-5 sm:w-6 sm:h-6 bg-red-400 hover:bg-red-500 border border-gray-500 flex items-center justify-center retro-button"
                >
                  <span className="text-black text-xs">×</span>
                </button>
              </div>
            </div>

            {/* Menu Bar */}


            {/* Toolbar */}
            <div className="bg-gray-100 border-b border-gray-400 px-2 sm:px-4 py-2">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/AnishaR_resume%20(4).pdf';
                    link.download = 'AnishaR_resume.pdf';
                    link.click();
                  }}
                  className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 border border-gray-400 px-2 py-1 text-xs font-bold"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Download</span>
                </button>
                <span className="text-xs text-gray-600">PDF Document</span>
              </div>
            </div>

            {/* PDF Viewer Content */}
            <div className="bg-white flex-1 overflow-auto p-4">
              <div className="flex justify-center">
                <div className="bg-white shadow-lg border border-gray-300 w-full max-w-4xl">
                  {/* Actual PDF Embed */}
                  <iframe
                    src="/AnishaR_resume%20(4).pdf"
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    className="border-none"
                    title="AnishaR Resume"
                  />
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-gray-200 border-t border-gray-400 px-2 sm:px-4 py-1 text-xs text-gray-600 flex justify-between">
              <span>Ready</span>
              <div className="flex space-x-4">
                <span>Page: 1</span>
                <span>PDF Document</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
