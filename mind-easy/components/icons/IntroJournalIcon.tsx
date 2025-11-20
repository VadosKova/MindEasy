import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function IntroJournalIcon({ size = 41 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 41 41" fill="none">
      <Path
        d="M20.5 12.5272C20.5 9.39584 17.9375 6.83334 14.8061 6.83334H3.41663V27.3333H14.8761C20.5 27.3333 20.5 33.0289 20.5 33.0289M20.5 12.5272C20.5 9.39414 23.0625 6.83334 26.1938 6.83334H37.5833V27.3333H26.1938C20.5 27.3333 20.5 33.0289 20.5 33.0289M20.5 12.5272V33.0289M23.7031 34.9491C24.0595 34.2109 24.6148 33.5867 25.3065 33.1467C25.9982 32.7067 26.7989 32.4683 27.6186 32.4583H35.875M17.2968 34.9491C16.9469 34.2059 16.3932 33.5772 15.7 33.1363C15.0069 32.6954 14.2028 32.4603 13.3813 32.4583H5.12496"
        stroke="black"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

