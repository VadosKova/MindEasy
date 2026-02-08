import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAppSettings } from "@/context/AppSettingsContext";
import { translations } from "@/constants/i18n";

export default function SOSStart() {
  const router = useRouter();
  const { language } = useAppSettings();
  const t = translations[language];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t.sosMode}</Text>

      <View style={styles.center}>
        <Text style={styles.main}>
          {t.everythingOkay}
        </Text>
        <Text style={styles.sub}>
          {t.stayWithMe}
        </Text>
        <Text style={styles.sub2}>
          {t.stepByStep}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/sos/body")}
      >
        <Text style={styles.buttonText}>{t.startGrounding}</Text>
      </Pressable>

      <Text style={styles.footer}>
        {t.stopAnytime}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    padding: 24,
    justifyContent: "space-between"
  },

  header: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12
  },

  center: {
    alignItems: "center"
  },

  main: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12
  },

  sub: {
    color: "#C9CDD6",
    fontSize: 18,
    textAlign: "center"
  },

  sub2: {
    color: "#8B90A0",
    fontSize: 16,
    marginTop: 6,
    textAlign: "center"
  },

  button: {
    backgroundColor: "#4A7DFF",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },

  footer: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 12
  }
});