import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are not alone 🤍</Text>

      <Text style={styles.text}>
        What you are feeling right now is difficult, but it will pass.
        Take a moment to breathe and remind yourself:
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>• You are safe</Text>
        <Text style={styles.cardText}>• This feeling is temporary</Text>
        <Text style={styles.cardText}>• You are doing your best</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("finish" as any)}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#E5E7EB",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  cardText: {
    fontSize: 16,
    color: "#E5E7EB",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#B1E8C6",
    paddingVertical: 14,
    borderRadius: 14,
  },
  buttonText: {
    color: "#1D3D30",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});