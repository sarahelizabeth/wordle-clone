import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

export type SubscribeModalRef = BottomSheetModal;

import disc from '@jsamr/counter-style/presets/disc';
import MarkedList from '@jsamr/react-native-li';

const BENEFITS = [
  'Enjoy full access to Wordle, Spelling Bee, The Crossword and more.',
  'Play new puzzles every day for concentration or relaxation.',
  'Strengthen your strategy with WordleBot.',
  'Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.',
  'Track your stats and streaks on any device.',
];

const SubscribeModal = forwardRef<SubscribeModalRef>((props, ref) => {
  const snapPoints = useMemo(() => ['90%'], []);
  const { dismiss } = useBottomSheetModal();
  const { bottom } = useSafeAreaInsets();

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
      index={0}
      backdropComponent={renderBackdrop}
      handleComponent={null}
    >
      <View style={styles.contentContainer}>
        <View style={styles.buttonsContainer}>
          <Link href='/login' asChild>
            <TouchableOpacity>
              <Text style={styles.loginText}>LOG IN</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name='close' size={24} color={Colors.light.gray} />
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView>
          <Text style={styles.modalHeader}>Unlimited Play.{'\n'}Try free for 7 days.</Text>
          <Image source={require('@/assets/images/games.png')} style={styles.gamesImg} />
          <MarkedList counterRenderer={disc} lineStyle={{ marginVertical: 10, paddingHorizontal: 40, gap: 10 }}>
            {BENEFITS.map((benefit, index) => (
              <Text key={index} style={styles.listText}>{benefit}</Text>
            ))}
          </MarkedList>
          <Text style={styles.disclaimer}>
            If you subscribe to The New York Times via this app, payment for your subscription will be automatically
            charged to your Apple ID account upon your confirmation of purchase with Apple. Your Apple ID account will
            be automatically charged for renewal at the applicable rate shown to you at the time of subscription every
            calendar month (for monthly subscriptions) or every year (for annual subscriptions) within 24-hours prior to
            the start of your next billing period. For special introductory offers, you will be automatically charged
            the applicable introductory rate shown to you at the time of subscription for the stated introductory period
            and the standard rate rate shown to you at the time of subscription thereafter. You will be charged in
            advance. Subscriptions continue automatically until you cancel. Cancellation takes effect at the end of your
            current billing period. You can manage and cancel subscriptions in your account settings on the App Store.
            To cancel, please turn off auto-renew at lead; 24-hours before the end of your current billing period from
            your iTunes account settings.
          </Text>
        </BottomSheetScrollView>

        <View style={[styles.footer, { paddingBottom: bottom }]}>
          <TouchableOpacity style={defaultStyles.button}>
            <Text style={defaultStyles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>$2.99 / month after 7 day trial. Cancel anytime.</Text>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default SubscribeModal

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  modalHeader: {
    fontSize: 34,
    padding: 20,
    textAlign: 'center',
    fontFamily: 'FrankRuhlLibre_900Black',
  },
  gamesImg: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
  },
  listText: {
    fontSize: 14,
    flexShrink: 1,
    color: '#4f4f4f',
  },
  disclaimer: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#484848',
    marginHorizontal: 30,
    lineHeight: 18,
    marginBottom: 20,
  },
  footer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#484848',
    paddingTop: 10,
  },
});
