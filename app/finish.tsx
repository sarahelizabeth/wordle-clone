import { StyleSheet, Text, TouchableOpacity, View, Image, useColorScheme } from 'react-native'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Icon from '@/assets/images/wordle-icon.svg';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as MailComposer from 'expo-mail-composer';
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
  const numberGuesses = finalBoard.split(',').length;
  const colorScheme = useColorScheme();
  const greenColor = colorScheme === 'dark' ? Colors.dark.green : Colors.light.green;

  const navigateRoot = () => {
    router.dismissAll();
    router.replace('/');
  }

  const handleShare = () => {
    const board = JSON.parse(finalBoard!);
    const boardImage: string[][] = [];
    const wordArray = word.split('');

    board.forEach((row: string[], rowIndex: number) => {
      boardImage.push([]);
      row.forEach((letter, cellIndex) => {
        if (wordArray[cellIndex] === letter) {
          boardImage[rowIndex].push('🟩');
        } else if (wordArray.includes(letter)) {
          boardImage[rowIndex].push('🟨');
        } else {
          boardImage[rowIndex].push('⬜');
        }
      })
    });

    console.log(boardImage);

    const html = `
      <html>
        <head>
          <style>

            .game {
              display: flex;
              flex-direction: column;
            }
              .row {
              display: flex;
              flex-direction: row;

              }
            .cell {
              display: flex;
              justify-content: center;
              align-items: center;
            }

          </style>
        </head>
        <body>
          <h1>Wordle</h1>
          <div class="game">
           ${boardImage
             .map((row) => `<div class="row">${row.map((cell) => `<div class="cell">${cell}</div>`).join('')}</div>`)
             .join('')}
          </div>
        </body>
      </html>
    `;

    MailComposer.composeAsync({
      subject: 'I just played Wordle!',
      body: html,
      isHtml: true,
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateRoot} style={{ alignSelf: 'flex-end' }}>
        <Ionicons name='close' size={30} color={Colors.light.gray} />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', gap: 10 }}>
        {win === 'true' ? <Image source={require('@/assets/images/win.png')} /> : <Icon width={100} height={70} />}
        <Text style={styles.title}>{win === 'true' ? 'Congratulations!' : 'You Lost'}</Text>

        <SignedIn>
          <Text style={styles.text}>Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
              <Text style={styles.statsItemValue}>{userScore?.played}</Text>
              <Text style={styles.statsItemTitle}>Played</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsItemValue}>{userScore?.wins}</Text>
              <Text style={styles.statsItemTitle}>Wins</Text>
            </View>
            <View style={styles.statsItem}>
              <Text style={styles.statsItemValue}>{userScore?.currentStreak}</Text>
              <Text style={styles.statsItemTitle}>Streak</Text>
            </View>
          </View>
        </SignedIn>

        <SignedOut>
          <Text style={styles.text}>Want to see your stats and streaks?</Text>
          <Link href={'/login'} style={[styles.button, { backgroundColor: colorScheme === 'dark' ? Colors.dark.buttonBg : Colors.light.buttonBg }]} asChild>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Create a free account</Text>
            </TouchableOpacity>
          </Link>
          <Link href={'/login'} asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </Link>
        </SignedOut>

        <View style={styles.divider} />

        <TouchableOpacity onPress={handleShare} style={[styles.iconButton, { backgroundColor: greenColor }]}>
          <Text style={styles.buttonText}>Share</Text>
          <Ionicons name='share-social' size={24} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Finish

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  title: {
    fontSize: 38,
    fontFamily: 'FrankRuhlLibre_800ExtraBold',
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'FrankRuhlLibre_500Medium',
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
  statsItem: {
    alignItems: 'center',
    gap: 4,
  },
  statsItemValue: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statsItemTitle: {
    fontSize: 14,
  },
  divider: {
    width: '100%',
    backgroundColor: '#4e4e4e',
    height: StyleSheet.hairlineWidth,
    marginTop: 12,
    marginBottom: 4,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    padding: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  linkText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    paddingVertical: 14,
  },
  button: {
    borderRadius: 30,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
});
