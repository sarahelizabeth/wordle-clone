import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'wordle-clone-course.firebaseapp.com',
  projectId: 'wordle-clone-course',
  storageBucket: 'wordle-clone-course.firebasestorage.app',
  messagingSenderId: '725914265093',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
