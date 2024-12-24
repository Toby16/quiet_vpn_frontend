import React from "react";

const ScrollingText = ({text}) => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-bg_200 border-t border-b border-indigo-600 text-indigo-600 p-1 w-full">
      <div className="inline-block animate-scroll px-4">
        {text} 
      </div>
    </div>
  );
};

export default ScrollingText;
