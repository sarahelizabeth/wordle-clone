import { Text, TextProps, useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors';

const ThemedText = ({ style, children, ...props }: TextProps) => {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? 'light'].text;

  return (
    <Text style={[style, { color: textColor }]} {...props}>
      {children}
    </Text>
  )
}

export default ThemedText;