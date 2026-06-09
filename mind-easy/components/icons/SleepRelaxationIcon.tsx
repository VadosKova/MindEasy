import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SleepRelaxationIconProps {
  size?: number;
  color?: string;
}

export function SleepRelaxationIcon({ size = 49, color = 'white' }: SleepRelaxationIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 49 49" fill="none">
      <Path
        d="M31.0741 12.3113L36.2395 8.35044L29.7266 8.16669L27.5625 2.04169L25.3983 8.16669L18.8854 8.35044L24.0508 12.3113L22.1929 18.5588L27.5625 14.8634L32.932 18.5588L31.0741 12.3113Z"
        fill={color}
      />
      <Path
        d="M40.0371 25.0104L43.3854 22.4583L39.1796 22.3562L37.7708 18.375L36.3621 22.3562L32.1562 22.4583L35.5046 25.0104L34.3 29.0529L37.7708 26.6642L41.2417 29.0529L40.0371 25.0104Z"
        fill={color}
      />
      <Path
        d="M14.2917 12.25C14.2917 24.6633 24.3367 34.7083 36.75 34.7083C37.8321 34.7083 38.8937 34.6267 39.935 34.4837C36.6479 39.5267 30.9721 42.875 24.5 42.875C14.3529 42.875 6.125 34.6471 6.125 24.5C6.125 18.0279 9.47333 12.3521 14.5162 9.065C14.3733 10.1063 14.2917 11.1679 14.2917 12.25Z"
        fill={color}
        stroke={color}
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
