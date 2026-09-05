import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hiremind-73b58.firebaseapp.com",
  projectId: "hiremind-73b58",
  storageBucket: "hiremind-73b58.firebasestorage.app",
  messagingSenderId: "142973696190",
  appId: "1:142973696190:web:f3a06a2934bc5c7f6306ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()
export {auth, provider}