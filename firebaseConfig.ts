import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOZDeiQZPc8ILElX4yBbBJ4W2qYeQNGds",
  authDomain: "bark-buddy-24054.firebaseapp.com",
  projectId: "bark-buddy-24054",
  storageBucket: "bark-buddy-24054.appspot.com",
  messagingSenderId: "568506073260",
  appId: "1:568506073260:web:e6e59a3c68471208685f09"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const GET_AUTH = getAuth(FIREBASE_APP);