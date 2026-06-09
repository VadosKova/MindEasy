import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAppSettings } from "@/context/AppSettingsContext";
import { translations } from "@/constants/i18n";

export default function SupportScreen() {
  const router = useRouter();
  const { language } = useAppSettings();
  const t = translations[language];

  const poem = useMemo(() => {
    const poems = t.sosPoems;
    return poems[Math.floor(Math.random() * poems.length)];
  }, []);

  const poemIntro =
    language === "Ukrainian"
      ? "Прочитай цей вірш повільно.\nНехай слова трохи побудуть з тобою."
      : "Read this poem slowly.\nLet the words stay with you for a moment.";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.notAlone}</Text>

      <Text style={styles.text}>
        {t.supportText}
      </Text>

      <View style={styles.poemWrapper}>
        <Text style={styles.poemIntro}>
          {poemIntro}
        </Text>

        <View style={styles.poemBox}>
          <Text style={styles.poemText}>
            “{poem.text}”
          </Text>

          <Text style={styles.poemAuthor}>
            — {poem.author}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>{t.safe}</Text>
        <Text style={styles.cardText}>{t.temporary}</Text>
        <Text style={styles.cardText}>{t.doingBest}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/sos/finish")}
      >
        <Text style={styles.buttonText}>{t.continue}</Text>
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
  poemWrapper: {
    marginBottom: 28,
  },
  poemIntro: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 20,
  },
  poemBox: {
    backgroundColor: "#0B1220",
    borderRadius: 18,
    padding: 20,
  },
  poemText: {
    fontSize: 17,
    color: "#E5E7EB",
    textAlign: "left",
    lineHeight: 26,
    fontStyle: "italic",
  },
  poemAuthor: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "left",
    marginTop: 14,
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