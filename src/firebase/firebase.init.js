
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCrGxq4owJ2iTTXEaV0FqJIj6sjlbkOoJA",
  authDomain: "pay-per-tasks.firebaseapp.com",
  projectId: "pay-per-tasks",
  storageBucket: "pay-per-tasks.firebasestorage.app",
  messagingSenderId: "314693466534",
  appId: "1:314693466534:web:4ae34cb8161e0cc317b767",
  measurementId: "G-LC990WMQTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const auth = getAuth(app);
export default auth;
