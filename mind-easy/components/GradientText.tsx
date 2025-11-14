import React from 'react';
import { Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientTextProps {
  colors: string[];
  style?: any;
  children: React.ReactNode;
}

export function GradientText({ colors, style, children }: GradientTextProps) {
  if (Platform.OS === 'web') {
    return (
      <Text style={[style, { background: `linear-gradient(to right, ${colors.join(', ')})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }]}>
        {children}
      </Text>
    );
  }

  return (
    <MaskedView
      maskElement={
        <Text style={style}>{children}</Text>
      }>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}