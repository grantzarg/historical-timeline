import React from 'react';

type Props = {
  width?: number;
  height?: number;
  viewBox?: string;
  strokeWidth?: number;
  className?: string;
};

const LeftArrow: React.FC<Props> = ({
  width = 12,
  height = 12,
  viewBox = "0 0 12 12",
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={viewBox} 
      fill="none"
      className={className}
    >
      <path 
        d="M7 1L2 6L7 11" 
        stroke="currentColor" 
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default LeftArrow;
