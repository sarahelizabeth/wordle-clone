import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState, useRef } from 'react'
import { Colors } from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ROWS, COLUMNS } from '@/constants/General';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SettingsModal from '@/components/SettingsModal';
import OnScreenKeyboard from '@/components/OnScreenKeyboard';
import { allWords } from '@/utils/allWords';

const Game = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].gameBg;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const grayColor = Colors[colorScheme ?? 'light'].gray;
  const greenColor = Colors[colorScheme ?? 'light'].green;
  const yellowColor = Colors[colorScheme ?? 'light'].yellow;

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

  const getCellBackgroundColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (currentRow > rowIndex) {
      if (wordArray[cellIndex] === cell) {
        return greenColor;
      } else if (wordArray.includes(cell)) {
        return yellowColor;
      } else {
        return grayColor;
      }
    }
    return 'transparent';
  };
  const getCellBorderColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (currentRow > rowIndex && cell !== '') {
      return getCellBackgroundColor(cell, rowIndex, cellIndex);
    }
    return Colors[colorScheme ?? 'light'].gray;
  };

  const [word, setWord] = useState<string>('sarah');
  const wordArray = word.split('');

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
      // TODO: show error
      console.log('not enough letters');
      return;
    }

    if (!allWords.includes(currentWord)) {
      // TODO: show error
      console.log('not a valid word');
      // return;
    }

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
        // TODO: show success
        console.log('you win');
        router.push(`/finish?win=true&word=${word}&finalBoard=${JSON.stringify(rows)}`);
      } else if (currentRow + 1 >= ROWS) {
        // TODO: show fail
        console.log('you failed');
      }
    }, 1000);

    // reset the board
    setCurrentRow(currentRow + 1);
    handleSetCurrentColumn(0);
  }

  // SETTINGS MODAL
  const settingsModalRef = useRef<BottomSheetModal>(null);
  const handleShowSettings = () => settingsModalRef.current?.present();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SettingsModal ref={settingsModalRef} />
      <Stack.Screen options={{
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity>
              <Ionicons name="help-circle-outline" size={28} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="podium-outline" size={24} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShowSettings}>
              <Ionicons name="settings-sharp" size={24} color={textColor} />
            </TouchableOpacity>
          </View>
        )
      }}/>
      
      <View style={styles.gameContainer}>
        {rows.map((row, rowIndex) => (
          <View style={styles.row} key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <View key={`cell-${rowIndex}-${cellIndex}`}>
                <View style={[styles.cell, { backgroundColor: getCellBackgroundColor(cell, rowIndex, cellIndex), borderColor: getCellBorderColor(cell, rowIndex, cellIndex) }]}>
                  <Text style={[styles.letter, { color: currentRow > rowIndex ? '#fff' : textColor }]}>{cell}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>

      <OnScreenKeyboard 
        onKeyPressed={addKey} 
        greenLetters={greenLetters} 
        yellowLetters={yellowLetters} 
        grayLetters={grayLetters} 
      />
    </View>
  )
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