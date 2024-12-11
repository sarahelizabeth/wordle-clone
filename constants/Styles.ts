import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const defaultStyles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.buttonBg,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.buttonText,
  },
});