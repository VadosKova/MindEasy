import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

type Task = {
  question: string;
  options: number[];
  correct: number;
};

const TASKS: Task[] = [
  { question: "12 + 7", options: [15, 19, 21], correct: 19 },
  { question: "25 - 9", options: [14, 16, 18], correct: 16 },
  { question: "8 + 6", options: [12, 13, 14], correct: 14 }
];

export default function SOSFocus() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);

  const task = TASKS[index];

  const select = () => {
    if (locked) return;

    setLocked(true);

    setTimeout(() => {
      if (index >= TASKS.length - 1) {
        router.replace("/sos/support");
      } else {
        setIndex(prev => prev + 1);
        setLocked(false);
      }
    }, 900);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus here</Text>

      <Text style={styles.question}>{task.question} = ?</Text>

      <View style={styles.options}>
        {task.options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={styles.option}
            onPress={select}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.helper}>
        Just choose — no pressure
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    justifyContent: "center",
    padding: 24
  },

  title: {
    color: "#8B93A7",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30
  },

  question: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "600"
  },

  options: {
    gap: 18
  },

  option: {
    backgroundColor: "#1C1F27",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center"
  },

  optionText: {
    color: "white",
    fontSize: 22
  },

  helper: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 40
  }
});