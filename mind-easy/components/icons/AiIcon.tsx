import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface AiIconProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export function AiIcon({ size = 30, style }: AiIconProps) {
  return (
    <Image
      source={require('../../assets/images/AI.png')}
      style={[
        {
          width: size,
          height: size,
          resizeMode: 'contain',
        },
        style,
      ]}
    />
  );
}