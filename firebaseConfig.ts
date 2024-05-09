import { initializeApp, getApps } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOZDeiQZPc8ILElX4yBbBJ4W2qYeQNGds",
  authDomain: "bark-buddy-24054.firebaseapp.com",
  projectId: "bark-buddy-24054",
  storageBucket: "bark-buddy-24054.appspot.com",
  messagingSenderId: "568506073260",
  appId: "1:568506073260:web:e6e59a3c68471208685f09"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export { auth };
