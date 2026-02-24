import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface ChatbotIconProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export function ChatbotIcon({ size = 30, style }: ChatbotIconProps) {
  return (
    <Image
      source={require('../assets/images/Chatbot.png')}
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