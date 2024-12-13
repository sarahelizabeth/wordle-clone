import { StyleSheet, Switch, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useCallback, useMemo, forwardRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Colors } from '@/constants/Colors';
import { storage } from '@/utils/storage';
import { useMMKVBoolean } from 'react-native-mmkv';

export type SettingsModalRef = BottomSheetModal;

const SettingsModal = forwardRef<SettingsModalRef>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const { dismiss } = useBottomSheetModal();
  const { bottom } = useSafeAreaInsets();

  const colorScheme = useColorScheme();
  const switchOffColor = colorScheme === 'dark' ? Colors.dark.gray : Colors.light.gray;
  const switchOnColor = colorScheme === 'dark' ? Colors.dark.green : Colors.light.green;

  const [darkMode, setDarkMode] = useMMKVBoolean('dark-mode', storage);
  const [hardMode, setHardMode] = useMMKVBoolean('hard-mode', storage);
  const [highContrastMode, setHighContrastMode] = useMMKVBoolean('high-contrast-mode', storage);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !!!prev);
  }

  const toggleHardMode = () => {
    setHardMode((prev) => !!!prev);
  }

  const toggleHighContrastMode = () => {
    setHighContrastMode((prev) => !!!prev);
  }

  const renderBackdrop = useCallback((props: any) => (
    <BottomSheetBackdrop
      opacity={0.2}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
      onPress={dismiss}
    />
  ), [dismiss]);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      onDismiss={dismiss}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      index={0}
    >
      <View
        style={[
          styles.contentContainer,
          { backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background },
        ]}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>SETTINGS</Text>
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name='close' size={28} color={Colors.light.gray} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.settingRow}>
            <View style={styles.textContainer}>
              <Text style={[styles.settingText, { color: Colors[colorScheme ?? 'light'].text }]}>Hard Mode</Text>
              <Text style={styles.settingDescription}>Words are more difficult and/or obscure</Text>
            </View>
            <Switch
              value={hardMode}
              onValueChange={toggleHardMode}
              trackColor={{ false: switchOffColor, true: switchOnColor }}
              thumbColor='#fff'
            />
          </View>
          <View style={styles.settingRow}>
            <View style={styles.textContainer}>
              <Text style={[styles.settingText, { color: Colors[colorScheme ?? 'light'].text }]}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Change the app to dark mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: switchOffColor, true: switchOnColor }}
              thumbColor='#fff'
            />
          </View>
          <View style={styles.settingRow}>
            <View style={styles.textContainer}>
              <Text style={[styles.settingText, { color: Colors[colorScheme ?? 'light'].text }]}>High Contrast Mode</Text>
              <Text style={styles.settingDescription}>Increase contrast for better visibility</Text>
            </View>
            <Switch
              value={highContrastMode}
              onValueChange={toggleHighContrastMode}
              trackColor={{ false: switchOffColor, true: switchOnColor }}
              thumbColor='#fff'
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default SettingsModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 4,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#888',
  },
  textContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.gray,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.light.gray,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
})