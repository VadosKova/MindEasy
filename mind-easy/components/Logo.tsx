import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export function Logo({ size = 120 }: { size?: number }) {
  const aspectRatio = 126 / 105;
  const width = size;
  const height = size / aspectRatio;

  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});