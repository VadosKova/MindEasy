import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface PdfIconProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export function PdfIcon({ size = 32, style }: PdfIconProps) {
  return (
    <Image
      source={require('../../assets/images/PDF.png')}
      style={[
        {
          width: size,
          height: (size * 34) / 32,
          resizeMode: 'contain',
        },
        style,
      ]}
    />
  );
}