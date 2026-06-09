import * as React from 'react';
import Svg, { Path, Defs, RadialGradient, LinearGradient, Stop } from 'react-native-svg';

interface ChatbotIconProps {
  size?: number;
  color?: string;
}

export function ChatbotIcon({ size = 30 }: ChatbotIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      <Path d="M76.875 134.985C96.495 134.737 108.338 130.523 115.29 124.185C121.853 118.185 123.458 110.857 123.713 105.015H123.75V99.84C123.748 96.241 122.317 92.7901 119.771 90.2459C117.226 87.7017 113.774 86.2725 110.175 86.2725H86.25V86.25H63.75V86.2725H39.825C32.325 86.2725 26.25 92.3475 26.25 99.8475V105.015H26.2875C26.5425 110.865 28.1475 118.192 34.71 124.177C41.6625 130.522 53.505 134.737 73.125 134.985V135H76.875V134.985Z" fill="url(#paint0_radial_545_312)"/>
      <Path d="M76.875 134.985C96.495 134.737 108.338 130.523 115.29 124.185C121.853 118.185 123.458 110.857 123.713 105.015H123.75V99.84C123.748 96.241 122.317 92.7901 119.771 90.2459C117.226 87.7017 113.774 86.2725 110.175 86.2725H86.25V86.25H63.75V86.2725H39.825C32.325 86.2725 26.25 92.3475 26.25 99.8475V105.015H26.2875C26.5425 110.865 28.1475 118.192 34.71 124.177C41.6625 130.522 53.505 134.737 73.125 134.985V135H76.875V134.985Z" fill="url(#paint1_linear_545_312)"/>
      <Path d="M78.75 18.75C78.75 17.7554 78.3549 16.8016 77.6517 16.0984C76.9484 15.3951 75.9946 15 75 15C74.0054 15 73.0516 15.3951 72.3483 16.0984C71.6451 16.8016 71.25 17.7554 71.25 18.75V26.25H78.75V18.75Z" fill="url(#paint2_linear_545_312)"/>
      <Path d="M37.5 33.75C37.5 30.7663 38.6853 27.9048 40.795 25.795C42.9048 23.6853 45.7663 22.5 48.75 22.5H101.25C104.234 22.5 107.095 23.6853 109.205 25.795C111.315 27.9048 112.5 30.7663 112.5 33.75V63.75C112.5 66.7337 111.315 69.5952 109.205 71.705C107.095 73.8147 104.234 75 101.25 75H48.75C45.7663 75 42.9048 73.8147 40.795 71.705C38.6853 69.5952 37.5 66.7337 37.5 63.75V33.75Z" fill="url(#paint3_radial_545_312)"/>
      <Path d="M90 41.25C88.0109 41.25 86.1032 42.0402 84.6967 43.4467C83.2902 44.8532 82.5 46.7609 82.5 48.75C82.5 50.7391 83.2902 52.6468 84.6967 54.0533C86.1032 55.4598 88.0109 56.25 90 56.25C91.9891 56.25 93.8968 55.4598 95.3033 54.0533C96.7098 52.6468 97.5 50.7391 97.5 48.75C97.5 46.7609 96.7098 44.8532 95.3033 43.4467C93.8968 42.0402 91.9891 41.25 90 41.25Z" fill="url(#paint4_linear_545_312)"/>
      <Path d="M52.5 48.75C52.5 46.7609 53.2902 44.8532 54.6967 43.4467C56.1032 42.0402 58.0109 41.25 60 41.25C61.9891 41.25 63.8968 42.0402 65.3033 43.4467C66.7098 44.8532 67.5 46.7609 67.5 48.75C67.5 50.7391 66.7098 52.6468 65.3033 54.0533C63.8968 55.4598 61.9891 56.25 60 56.25C58.0109 56.25 56.1032 55.4598 54.6967 54.0533C53.2902 52.6468 52.5 50.7391 52.5 48.75Z" fill="url(#paint5_linear_545_312)"/>
      <Defs>
        <RadialGradient id="paint0_radial_545_312" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.75091 71.2458) rotate(30.403) scale(135.6 215.971)">
          <Stop offset="0" stopColor="#F08AF4" />
          <Stop offset="0.535" stopColor="#9C6CFE" />
          <Stop offset="1" stopColor="#4E44DB" />
        </RadialGradient>
        <LinearGradient id="paint1_linear_545_312" x1="75" y1="80.445" x2="97.0575" y2="162.855" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#885EDB" stopOpacity="0" />
          <Stop offset="1" stopColor="#E362F8" />
        </LinearGradient>
        <LinearGradient id="paint2_linear_545_312" x1="71.0775" y1="15" x2="78.99" y2="24.2175" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#8B52F4" />
          <Stop offset="1" stopColor="#3D35B1" />
        </LinearGradient>
        <RadialGradient id="paint3_radial_545_312" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11.2514 0.000495062) rotate(39.055) scale(127.368 243.317)">
          <Stop offset="0" stopColor="#F08AF4" />
          <Stop offset="0.535" stopColor="#9C6CFE" />
          <Stop offset="1" stopColor="#4E44DB" />
        </RadialGradient>
        <LinearGradient id="paint4_linear_545_312" x1="86.055" y1="41.8275" x2="97.425" y2="61.4475" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#FDFDFD" />
          <Stop offset="1" stopColor="#F9DCFA" />
        </LinearGradient>
        <LinearGradient id="paint5_linear_545_312" x1="56.055" y1="41.8275" x2="67.425" y2="61.4475" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#FDFDFD" />
          <Stop offset="1" stopColor="#F9DCFA" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}