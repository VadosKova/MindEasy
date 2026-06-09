import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface StressReliefIconProps {
  size?: number;
  color?: string;
}

export function StressReliefIcon({ size = 49, color = 'white' }: StressReliefIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 49 49" fill="none">
      <Path
        d="M14.2916 36.75C11.7442 36.75 9.3011 35.782 7.4998 34.0591C5.69849 32.3361 4.68652 29.9992 4.68652 27.5625C4.68652 25.1258 5.69849 22.789 7.4998 21.066C9.3011 19.343 11.7442 18.375 14.2916 18.375C14.8933 15.6947 16.6534 13.3392 19.1847 11.8268C20.438 11.0779 21.843 10.5586 23.3194 10.2984C24.7958 10.0382 26.3147 10.0423 27.7893 10.3104C29.264 10.5785 30.6655 11.1054 31.9139 11.861C33.1622 12.6166 34.233 13.5861 35.0651 14.7142C35.8972 15.8422 36.4742 17.1067 36.7633 18.4354C37.0524 19.7642 37.0479 21.1312 36.75 22.4583H38.7916C40.6868 22.4583 42.5044 23.2112 43.8445 24.5513C45.1846 25.8914 45.9375 27.709 45.9375 29.6042C45.9375 31.4994 45.1846 33.3169 43.8445 34.6571C42.5044 35.9972 40.6868 36.75 38.7916 36.75H36.75"
        stroke={color}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M26.5416 28.5833L22.4583 36.75H28.5833L24.4999 44.9167"
        stroke={color}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
