import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ThemeIconProps {
  size?: number;
  color?: string;
}

export function ThemeIcon({ size = 30, color = '#37474F' }: ThemeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Path
        d="M3.4375 15C3.4375 18.0666 4.65569 21.0075 6.82408 23.1759C8.99247 25.3443 11.9334 26.5625 15 26.5625V3.4375C11.9334 3.4375 8.99247 4.65569 6.82408 6.82408C4.65569 8.99247 3.4375 11.9334 3.4375 15Z"
        fill={color}
      />
      <Path
        d="M15 26.5625C18.0666 26.5625 21.0075 25.3443 23.1759 23.1759C25.3443 21.0075 26.5625 18.0666 26.5625 15C26.5625 11.9334 25.3443 8.99247 23.1759 6.82408C21.0075 4.65569 18.0666 3.4375 15 3.4375M15 26.5625C11.9334 26.5625 8.99247 25.3443 6.82408 23.1759C4.65569 21.0075 3.4375 18.0666 3.4375 15C3.4375 11.9334 4.65569 8.99247 6.82408 6.82408C8.99247 4.65569 11.9334 3.4375 15 3.4375M15 26.5625V3.4375"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
