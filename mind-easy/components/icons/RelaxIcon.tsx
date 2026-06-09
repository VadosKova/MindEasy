import React from 'react';
import { SvgXml } from 'react-native-svg';

const RelaxIcon = ({ width = 50, height = 50 }: { width?: number; height?: number }) => {
  const xml = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" fill="#8CCAED"/>
  <circle cx="25" cy="25" r="12" fill="white" opacity="0.7"/>
  <circle cx="22" cy="22" r="3" fill="white"/>
  </svg>`;

  return <SvgXml xml={xml} width={width} height={height} />;
};

export default RelaxIcon;
