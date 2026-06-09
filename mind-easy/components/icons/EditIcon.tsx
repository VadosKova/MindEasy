import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EditIconProps {
  size?: number;
  color?: string;
}

export function EditIcon({ size = 26, color = '#37474F' }: EditIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Path
        d="M22.4358 7.62666C22.8583 7.20416 22.8583 6.49999 22.4358 6.09916L19.9008 3.56416C19.5 3.14166 18.7958 3.14166 18.3733 3.56416L16.38 5.54666L20.4425 9.60916M3.25 18.6875V22.75H7.3125L19.2942 10.7575L15.2317 6.69499L3.25 18.6875Z"
        fill={color}
      />
    </Svg>
  );
}
