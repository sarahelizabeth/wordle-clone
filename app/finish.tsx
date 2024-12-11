import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react';

const Finish = () => {
  const { win, word, finalBoard } = useLocalSearchParams<{
    win: string;
    word: string;
    finalBoard: string;
  }>();
  const router = useRouter();
  const [userScore, setUserScore] = useState<any>({
    played: 42,
    wins: 2,
    currentStreak: 1,
  });

  return (
    <View>
      <Text>Finish</Text>
    </View>
  )
}

export default Finish

const styles = StyleSheet.create({})