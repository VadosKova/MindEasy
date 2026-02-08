import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAudioPlayer } from "expo-audio";

export default function AudioPlayer({ url }: { url: string }) {
  const player = useAudioPlayer(url);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.play}
        onPress={() => player.playing ? player.pause() : player.play()}
      >
        <Text style={styles.icon}>
          {player.playing ? "⏸" : "▶"}
        </Text>
      </TouchableOpacity>

      <View style={styles.wave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  play: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#CFCFCF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: { fontSize: 18 },
  wave: {
    flex: 1,
    height: 20,
    backgroundColor: "#BEBEBE",
    borderRadius: 6,
  },
});