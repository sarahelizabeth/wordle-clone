// TODO: change back to 6
export const ROWS = 6;
export const COLUMNS = 5;

export enum OAuthProvider {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

export const BENEFITS = [
  'Enjoy full access to Wordle, Spelling Bee, The Crossword and more.',
  'Play new puzzles every day for concentration or relaxation.',
  'Strengthen your strategy with WordleBot.',
  'Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.',
  'Track your stats and streaks on any device.',
];

export const DISCLAIMER = 'If you subscribe to The New York Times via this app, payment for your subscription will be automatically charged to your Apple ID account upon your confirmation of purchase with Apple. Your Apple ID account will be automatically charged for renewal at the applicable rate shown to you at the time of subscription every calendar month (for monthly subscriptions) or every year (for annual subscriptions) within 24-hours prior to the start of your next billing period. For special introductory offers, you will be automatically charged the applicable introductory rate shown to you at the time of subscription for the stated introductory period and the standard rate rate shown to you at the time of subscription thereafter. You will be charged in advance. Subscriptions continue automatically until you cancel. Cancellation takes effect at the end of your current billing period. You can manage and cancel subscriptions in your account settings on the App Store. To cancel, please turn off auto-renew at lead; 24-hours before the end of your current billing period from your iTunes account settings.'

export const ENTER = 'ENTER';
export const BACKSPACE = 'BACKSPACE';

export const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  [ENTER, 'z', 'x', 'c', 'v', 'b', 'n', 'm', BACKSPACE],
];
