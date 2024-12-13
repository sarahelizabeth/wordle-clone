import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Colors } from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ROWS, COLUMNS } from '@/constants/General';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SettingsModal from '@/components/SettingsModal';
import OnScreenKeyboard from '@/components/OnScreenKeyboard';
import { allWords } from '@/utils/allWords';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming, ZoomIn } from 'react-native-reanimated';

const Game = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].gameBg;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const grayColor = Colors[colorScheme ?? 'light'].gray;
  const greenColor = Colors[colorScheme ?? 'light'].green;
  const yellowColor = Colors[colorScheme ?? 'light'].yellow;

  const [word, setWord] = useState<string>('clerk');
  const wordArray = word.split('');
  const [rows, setRows] = useState<string[][]>(new Array(ROWS).fill(new Array(COLUMNS).fill('')));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const currentColumnRef = useRef<number>(currentColumn);
  const handleSetCurrentColumn = (column: number) => {
    currentColumnRef.current = column;
    setCurrentColumn(column);
  }

  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);

  // MAIN KEYBOARD HANDLER
  const addKey = (key: string) => {
    const currentBoard = [...rows.map(row => [...row])];

    if (key === 'ENTER') {
      checkWord();
    } else if (key === 'BACKSPACE') {
      if (currentColumnRef.current === 0) {
        currentBoard[currentRow][0] = '';
        setRows(currentBoard);
        return;
      }
      currentBoard[currentRow][currentColumnRef.current - 1] = '';
      handleSetCurrentColumn(currentColumnRef.current - 1);
      setRows(currentBoard);
      return;
    } else if (currentColumnRef.current >= currentBoard[currentRow].length) {
      // end of the row, do nothing
      return;
    } else {
      currentBoard[currentRow][currentColumnRef.current] = key;
      setRows(currentBoard);
      handleSetCurrentColumn(currentColumnRef.current + 1);
    }
  }

  // HANDLE WORD CHECK / ENTER KEY
  const checkWord = () => {
    const currentWord = rows[currentRow].join('');

    if (currentWord.length < word.length) {
      console.log('not enough letters');
      animateFlipCell();
      return;
    }

    if (!allWords.includes(currentWord)) {
      // TODO: show error
      console.log('not a valid word');
      animateFlipCell();
      return;
    }

    animateFlipGuess();

    const newGreen: string[] = [];
    const newYellow: string[] = [];
    const newGray: string[] = [];

    currentWord.split('').forEach((letter, index) => {
      if (letter === wordArray[index]) {
        newGreen.push(letter);
      } else if (wordArray.includes(letter)) {
        newYellow.push(letter);
      } else {
        newGray.push(letter);
      }
    });

    setGreenLetters([...greenLetters, ...newGreen]);
    setYellowLetters([...yellowLetters, ...newYellow]);
    setGrayLetters([...grayLetters, ...newGray]);

    // check if user won or lost
    setTimeout(() => {
      if (currentWord === word) {
        router.push(`/finish?win=true&word=${word}&finalBoard=${JSON.stringify(rows)}`);
      } else if (currentRow + 1 >= ROWS) {
        router.push(`/finish?win=false&word=${word}&finalBoard=${JSON.stringify(rows)}`);
      }
    }, 1000);

    // reset the board
    setCurrentRow(currentRow + 1);
    handleSetCurrentColumn(0);
  }

  // SETTINGS MODAL
  const settingsModalRef = useRef<BottomSheetModal>(null);
  const handleShowSettings = () => settingsModalRef.current?.present();


  /*** ANIMATION HANDLERS ***/

  // SHAKE
  const rowOffset = Array.from({ length: ROWS }, () => useSharedValue(0));
  const shakeRowStyles = Array.from({ length: ROWS }, (_, index) => useAnimatedStyle(() => ({
    transform: [{ translateX: rowOffset[index].value }],
  })));
  const animateFlipCell = () => {
    const TIME = 60;
    const OFFSET = 10;

    rowOffset[currentRow].value = withSequence(
      withTiming(-OFFSET, { duration: TIME / 2 }),
      withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
      withTiming(0, { duration: TIME / 2 }),
    )
  }

  // FLIP
  const cellOffset = Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => useSharedValue(0)));
  const cellBackgroundOffset = Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => useSharedValue('transparent')));
  const cellBorderOffset = Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => useSharedValue(Colors[colorScheme ?? 'light'].gray)));

  const flipCellStyles = Array.from({ length: ROWS }, (_, rowIndex) => Array.from({ length: COLUMNS }, (_, cellIndex) => useAnimatedStyle(() => {
    return {  
      transform: [{ rotateX: `${cellOffset[rowIndex][cellIndex].value}deg` }],
      backgroundColor: cellBackgroundOffset[rowIndex][cellIndex].value,
      borderColor: cellBorderOffset[rowIndex][cellIndex].value,
    }
  })));

  const animateFlipGuess = () => {
    const TIME = 300;
    const OFFSET = 90;

    cellOffset[currentRow].forEach((tileStyle, index) => {
      tileStyle.value = withDelay(
        index * 100,
        withSequence(
          withTiming(OFFSET, { duration: TIME }),
          withTiming(0, { duration: TIME }),
        )
      )
    })
  };

  const setCellBackgroundColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (currentRow > rowIndex) {
      if (wordArray[cellIndex] === cell) {
        cellBackgroundOffset[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(greenColor, { duration: 100 })
        );
      } else if (wordArray.includes(cell)) {
        cellBackgroundOffset[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(yellowColor, { duration: 100 })
        );
      } else {
        cellBackgroundOffset[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(grayColor, { duration: 100 })
        );
      }
    } else {
      cellBackgroundOffset[rowIndex][cellIndex].value = withTiming('transparent', { duration: 100 });
    }
  };
  const setCellBorderColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (currentRow > rowIndex && cell !== '') {
      if (wordArray[cellIndex] === cell) {
        cellBorderOffset[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(greenColor, { duration: 100 })
        );
      } else if (wordArray.includes(cell)) {
        cellBorderOffset[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(yellowColor, { duration: 100 })
        );
      } else {
        cellBorderOffset[rowIndex][cellIndex].value = withDelay(
          cellIndex * 200,
          withTiming(grayColor, { duration: 100 })
        );
      }
    } else {
      cellBorderOffset[rowIndex][cellIndex].value = withTiming(grayColor, { duration: 100 });
    }
  };

  useEffect(() => {
    if (currentRow === 0) return;
    rows[currentRow - 1].map((cell, cellIndex) => {
      setCellBackgroundColor(cell, currentRow - 1, cellIndex);
      setCellBorderColor(cell, currentRow - 1, cellIndex);
    })
  }, [currentRow])

  /*** END ANIMATION HANDLERS ***/

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SettingsModal ref={settingsModalRef} />
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <TouchableOpacity>
                <Ionicons name='help-circle-outline' size={28} color={textColor} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name='podium-outline' size={24} color={textColor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShowSettings}>
                <Ionicons name='settings-sharp' size={24} color={textColor} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <View style={styles.gameContainer}>
        {rows.map((row, rowIndex) => (
          <Animated.View style={[styles.row, shakeRowStyles[rowIndex]]} key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <Animated.View
                key={`cell-${rowIndex}-${cellIndex}`}
                entering={ZoomIn.delay(rowIndex * 100 + cellIndex * 10)}
              >
                <Animated.View
                  style={[
                    styles.cell,
                    flipCellStyles[rowIndex][cellIndex],
                  ]}
                >
                  <Text style={[styles.letter, { color: currentRow > rowIndex ? '#fff' : textColor }]}>{cell}</Text>
                </Animated.View>
              </Animated.View>
            ))}
          </Animated.View>
        ))}
      </View>

      <OnScreenKeyboard
        onKeyPressed={addKey}
        greenLetters={greenLetters}
        yellowLetters={yellowLetters}
        grayLetters={grayLetters}
      />
    </View>
  );
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  gameContainer: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  cell: {
    width: 62,
    height: 62,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
})