import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function FinishScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌿</Text>

      <Text style={styles.title}>You did great</Text>

      <Text style={styles.text}>
        You took time to care about yourself.
        This is an important step.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.replace("/tabs")}
      >
        <Text style={styles.primaryText}>Back to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/calm-breathing")}
      >
        <Text style={styles.secondaryText}>Repeat breathing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#B1E8C6",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginBottom: 16,
    width: "100%",
  },
  primaryText: {
    color: "#1D3D30",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#64748B",
    paddingVertical: 14,
    borderRadius: 16,
    width: "100%",
  },
  secondaryText: {
    color: "#CBD5E1",
    fontSize: 16,
    textAlign: "center",
  },
});