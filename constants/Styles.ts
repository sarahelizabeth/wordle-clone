import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

// Move styles outside component
export const createStyles = (isDark: boolean) => StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? Colors.dark.buttonBg : Colors.light.buttonBg,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? Colors.dark.buttonText : Colors.light.buttonText,
  },
  container: {
    flex: 1,
    backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
  }
});

// export default createStyles;