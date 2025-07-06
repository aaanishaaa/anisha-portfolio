import React from 'react';

function Panel() {
  return (
    <div className="flex items-center bg-gray-200 px-4 py-2 w-full">
      <div className="mr-4">
        <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
          <rect x="1" y="1" width="10" height="10" />
          <rect x="13" y="1" width="10" height="10" />
          <rect x="1" y="13" width="10" height="10" />
          <rect x="13" y="13" width="10" height="10" />
        </svg>
      </div>
      <div className="flex items-center bg-white w-full max-w-[420px] px-4 py-3 shadow-sm">
        <div className="text-gray-500 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Type here to search"
          className="flex-1 bg-transparent outline-none text-sm text-gray-700"
        />
      </div>
    </div>
  );
}

export default Panel;
