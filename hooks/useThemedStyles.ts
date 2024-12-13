import { useColorScheme } from "react-native";
import { createStyles } from "@/constants/Styles";

export const useThemedStyles = () => {
  const colorScheme = useColorScheme();
  return createStyles(colorScheme === 'dark');
};
  