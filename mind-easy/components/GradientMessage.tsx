import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface GradientMessageProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
}

const GradientMessage: React.FC<GradientMessageProps> = ({
  children,
  style,
  borderRadius = 16,
}) => {
  return (
    <LinearGradient
      colors={[
        "#8133F9",
        "#9529D4",
        "#A520AF",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          borderRadius,
          paddingHorizontal: 14,
          paddingVertical: 8,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientMessage;