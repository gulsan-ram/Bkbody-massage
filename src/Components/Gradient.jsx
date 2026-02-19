import React from 'react';
import { COLORS } from '../Constants/Colors';

const Gradient = ({ 
    colorStops = ['#77B103', '#88E8E5', '#77B103'],
    angle = '135deg',
    opacity = 0.15
}) => {
  const gradientString = colorStops.join(', ');
  
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: `linear-gradient(${angle}, ${colorStops.join(', ')})`,
        opacity: opacity,
        zIndex: 0,
      }}
    />
  );
};

export default Gradient;
