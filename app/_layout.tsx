import { Stack, useRouter } from "expo-router";
import { useFonts, FrankRuhlLibre_500Medium, FrankRuhlLibre_800ExtraBold, FrankRuhlLibre_900Black } from "@expo-google-fonts/frank-ruhl-libre";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { TouchableOpacity, useColorScheme, LogBox, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "../utils/cache";
import Logo from "../assets/images/nyt-logo.svg";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";

LogBox.ignoreAllLogs();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set");
}

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontsError] = useFonts({
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_900Black,
  });
  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen
                  name='login'
                  options={{
                    presentation: 'modal',
                    headerShadowVisible: false,
                    headerTitle: () => <Logo width={150} height={40} />,
                    headerLeft: () => (
                      <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='close' size={26} color={Colors.light.gray} />
                      </TouchableOpacity>
                    ),
                  }}
                />
                <Stack.Screen
                  name='game'
                  options={{
                    headerBackTitle: 'Wordle',
                    title: '',
                    headerBackTitleStyle: {
                      fontFamily: 'FrankRuhlLibre_900Black',
                      fontSize: 24,
                    },
                    headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
                  }}
                />
                <Stack.Screen
                  name='finish'
                  options={{ presentation: 'fullScreenModal', headerShadowVisible: false, title: '' }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  backText: {
    fontSize: 18,
    fontFamily: 'FrankRuhlLibre_900Black',
    marginLeft: 10,
  }
})

export default RootLayout;