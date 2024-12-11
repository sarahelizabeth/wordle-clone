import { Text, View, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import Icon from "@/assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";

const Index = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const buttonBg = Colors[colorScheme ?? 'light'].buttonBg;
  const buttonText = Colors[colorScheme ?? 'light'].buttonText;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Icon width={100} height={70} />
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>Get 6 chances to guess the 5-letter word</ThemedText>
      </View>

      <View style={styles.menu}>
        <Link href='/game' style={[styles.button, { backgroundColor: buttonBg }]} asChild>
          <TouchableOpacity>
            <ThemedText style={[styles.buttonText, { color: buttonText }]}>Start</ThemedText>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={[styles.buttonText, { color: buttonText }]}>Log In</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={[styles.buttonText, { color: buttonText }]}>Subscribe</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <ThemedText style={[styles.text, { color: textColor }]}>How to play</ThemedText>
        <ThemedText style={[styles.text, { color: textColor }]}>Made with ❤️ by Sarah</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    gap: 40,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  button: {
    borderColor: "#000",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "60%",
    maxWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "semibold",
    color: "#333",
    padding: 14,
  },
  menu: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center", 
  },
});

export default Index;