import React from "react";
import Svg, { Path } from "react-native-svg";

interface SendIconProps {
  size?: number;
  color?: string;
}

export const SendIcon: React.FC<SendIconProps> = ({
  size = 23,
  color = "#FFFFFF",
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
    >
      <Path
        d="M21.022 4.95458L18.1182 18.5485C17.9017 19.5059 17.3458 19.7215 16.5427 19.2893L12.1871 16.077L10.0548 18.1154C9.83919 18.332 9.62261 18.5485 9.12811 18.5485L9.46832 14.0683L17.5931 6.68533C17.9323 6.34513 17.5001 6.2215 17.0679 6.50038L6.96611 12.8637L2.60953 11.5355C1.65215 11.2269 1.65215 10.5771 2.82611 10.1459L19.7551 3.565C20.5888 3.31775 21.2999 3.75092 21.022 4.95458Z"
        fill={color}
      />
    </Svg>
  );
};