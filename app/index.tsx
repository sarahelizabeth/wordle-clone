import { Text, View, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import Icon from "@/assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import SubscribeModal from "@/components/SubscribeModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Animated, { FadeIn, FadeInDown, FadeInLeft } from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Index = () => {
  const colorScheme = useColorScheme();
  const subscribeModalRef = useRef<BottomSheetModal>(null);
  const { signOut } = useAuth(); 

  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const buttonBg = Colors[colorScheme ?? 'light'].buttonBg;
  const buttonText = Colors[colorScheme ?? 'light'].buttonText;

  const openSubscribeModal = () => {
    subscribeModalRef.current?.present();
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <SubscribeModal ref={subscribeModalRef} />
      <Animated.View style={styles.header} entering={FadeInDown}>
        <Icon width={100} height={70} />
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>Get 6 chances to guess the 5-letter word</ThemedText>
      </Animated.View>

      <View style={styles.menu}>
        <Link href='/game' style={[styles.button, { backgroundColor: buttonBg }]} asChild>
          <AnimatedTouchableOpacity entering={FadeInLeft}>
            <Text style={[styles.buttonText, { color: buttonText }]}>Start</Text>
          </AnimatedTouchableOpacity>
        </Link>

        <SignedOut>
          <Link href='/login' style={[styles.button, { borderColor: textColor }]} asChild>
            <AnimatedTouchableOpacity entering={FadeInLeft.delay(100)}>
              <ThemedText style={[styles.buttonText, { color: buttonText }]}>Log In</ThemedText>
            </AnimatedTouchableOpacity>
          </Link>
        </SignedOut>

        <SignedIn>
          <AnimatedTouchableOpacity 
            style={[styles.button, { borderColor: textColor }]} 
            onPress={() => signOut()}
            entering={FadeInLeft.delay(100)}
          >
            <ThemedText style={[styles.buttonText, { color: buttonText }]}>Sign Out</ThemedText>
          </AnimatedTouchableOpacity>
        </SignedIn>

        <AnimatedTouchableOpacity 
          style={[styles.button, { borderColor: textColor }]} 
          onPress={openSubscribeModal}
          entering={FadeInLeft.delay(200)}
        >
          <ThemedText style={[styles.buttonText, { color: buttonText }]}>Subscribe</ThemedText>
        </AnimatedTouchableOpacity>
      </View>

      <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
        <ThemedText style={[styles.text, { color: textColor }]}>How to play</ThemedText>
        <ThemedText style={[styles.text, { color: textColor }]}>Made with ❤️ by Sarah</ThemedText>
      </Animated.View>
    </Animated.View>
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
    padding: 14,
    color: "#fff",
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