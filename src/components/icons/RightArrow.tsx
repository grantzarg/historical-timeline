import React from 'react';

interface Props {
  width?: number;
  height?: number;
  viewBox?: string;
  strokeWidth?: number;
  className?: string;
}

const RightArrow: React.FC<Props> = ({
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
        d="M1 1L6 6L1 11" 
        stroke="currentColor" 
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default RightArrow;
