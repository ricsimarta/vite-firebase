import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-firebase-3d949.firebaseapp.com",
  projectId: "react-firebase-3d949",
  storageBucket: "react-firebase-3d949.firebasestorage.app",
  messagingSenderId: "485600302859",
  appId: "1:485600302859:web:cc7097cbbac39ab507740e",
  measurementId: "G-J3228R2JC9"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);