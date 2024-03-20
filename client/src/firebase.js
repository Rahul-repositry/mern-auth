// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKY-BcDfl981YEpsluM7ZPkijhjQSJ-n0",
  authDomain: "calm-bison-397808.firebaseapp.com",
  projectId: "calm-bison-397808",
  storageBucket: "calm-bison-397808.appspot.com",
  messagingSenderId: "623681947940",
  appId: "1:623681947940:web:24f69ba4f23ce7267e8bb1",
  measurementId: "G-LTZBEN1H7D",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
