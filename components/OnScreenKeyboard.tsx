import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { KEYS, ENTER, BACKSPACE } from '@/constants/General';
import { useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Colors } from '@/constants/Colors';

type OnScreenKeyboardProps = {
  onKeyPressed: (key: string) => void;
  greenLetters: string[];
  yellowLetters: string[];
  grayLetters: string[];
}

const OnScreenKeyboard = ({ 
  onKeyPressed, 
  greenLetters, 
  yellowLetters, 
  grayLetters 
}: OnScreenKeyboardProps) => {
  const { width } = useWindowDimensions();
  const keyWidth = (width - 60) / KEYS[0].length;
  const colorScheme = useColorScheme();
  const greenColor = Colors[colorScheme ?? 'light'].green;
  const yellowColor = Colors[colorScheme ?? 'light'].yellow;
  const grayColor = Colors[colorScheme ?? 'light'].gray;

  const isSpecialKey = (key: string) => [ENTER, BACKSPACE].includes(key);
  const isHighlightedKey = (key: string) => [...greenLetters, ...yellowLetters].includes(key);

  return (
    <View style={styles.container}>
      {KEYS.map((row, rowIndex) => (
        <View style={styles.row} key={`row-${rowIndex}`}>
          {row.map((key, keyIndex) => (
            <Pressable
              onPress={() => onKeyPressed(key)}
              style={({ pressed }) => [
                styles.key,
                { width: keyWidth, backgroundColor: '#ddd' },
                isSpecialKey(key) && { width: keyWidth * 1.5 },
                {
                  backgroundColor: greenLetters.includes(key)
                    ? greenColor
                    : yellowLetters.includes(key)
                    ? yellowColor
                    : grayLetters.includes(key)
                    ? grayColor
                    : '#ddd',
                },
                pressed && { backgroundColor: '#868686' }
              ]}
              key={`key-${rowIndex}-${keyIndex}`}
            >
              <Text
                style={[styles.keyText, key === ENTER && { fontSize: 12 }, isHighlightedKey(key) && { color: 'white' }]}
              >
                {isSpecialKey(key) ? (
                  key === ENTER ? (
                    'ENTER'
                  ) : (
                    <Ionicons name='backspace-outline' size={24} color='black' />
                  )
                ) : (
                  key
                )}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

export default OnScreenKeyboard

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    gap: 4,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  key: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
})