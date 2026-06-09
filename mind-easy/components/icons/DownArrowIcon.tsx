import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface DownArrowIconProps {
  size?: number;
  color?: string;
}

export function DownArrowIcon({ size = 20, color = '#37474F' }: DownArrowIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.4999 4.16667L2.49993 4.16667C2.34806 4.16715 2.1992 4.20903 2.06936 4.28782C1.93953 4.3666 1.83364 4.47931 1.7631 4.6138C1.69255 4.74829 1.66002 4.89947 1.66901 5.05107C1.67799 5.20267 1.72816 5.34896 1.81409 5.47417L9.31409 16.3075C9.62493 16.7567 10.3733 16.7567 10.6849 16.3075L18.1849 5.47417C18.2717 5.34922 18.3227 5.20286 18.3321 5.05101C18.3416 4.89915 18.3093 4.7476 18.2387 4.61283C18.1681 4.47806 18.0619 4.36521 17.9316 4.28655C17.8014 4.20789 17.6521 4.16643 17.4999 4.16667Z"
        fill={color}
      />
    </Svg>
  );
}
