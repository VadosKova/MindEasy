import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function AlarmClockIcon() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M3.75 6.53875L7.6875 3.75M26.25 6.53875L22.3125 3.75M25 16.25C25 18.9022 23.9464 21.4457 22.0711 23.3211C20.1957 25.1964 17.6522 26.25 15 26.25C12.3478 26.25 9.8043 25.1964 7.92893 23.3211C6.05357 21.4457 5 18.9022 5 16.25C5 13.5978 6.05357 11.0543 7.92893 9.17893C9.8043 7.30357 12.3478 6.25 15 6.25C17.6522 6.25 20.1957 7.30357 22.0711 9.17893C23.9464 11.0543 25 13.5978 25 16.25Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M15 10.625V16.875L18.75 19.375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}