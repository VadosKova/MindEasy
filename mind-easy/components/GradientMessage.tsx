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
        "#7F00FF",
        "#E100FF",
        "#00C6FF",
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