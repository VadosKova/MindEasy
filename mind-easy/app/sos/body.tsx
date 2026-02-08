import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const STEPS = [
  "Feel your feet touching the ground",
  "Slowly press your palms together",
  "Touch your face gently",
  "Look around you",
  "Name one thing you can hear"
];

export default function SOSBody() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      setTimeout(() => router.replace("/sos/focus"), 800);
      return;
    }

    const timer = setTimeout(() => {
      setStep(prev => prev + 1);
    }, 7000);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          {STEPS[Math.min(step, STEPS.length - 1)]}
        </Text>
      </View>

      <View style={styles.progress}>
        {STEPS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i <= step && styles.dotActive
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 24
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
    lineHeight: 34,
    fontWeight: "500"
  },

  progress: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2A2E38"
  },

  dotActive: {
    backgroundColor: "#4A7DFF",
    transform: [{ scale: 1.2 }]
  }
});