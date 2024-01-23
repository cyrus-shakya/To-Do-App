// Cyrus Shakya
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// mine web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnkw5Ju6YCGNjwvKu2qfc-ybhKDYzch1I",
  authDomain: "to-do-diary.firebaseapp.com",
  projectId: "to-do-diary",
  storageBucket: "to-do-diary.appspot.com",
  messagingSenderId: "294843019007",
  appId: "1:294843019007:web:5da2c5447f3084c00c66ca"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
