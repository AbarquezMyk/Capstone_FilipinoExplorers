import React from 'react';

function ProgressBar({ percentage, color }) {
  return (
    <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;