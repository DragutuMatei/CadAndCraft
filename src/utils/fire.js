import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA14H6bEuDU5AepoxRj1vhtKfO55sgGXyQ",
  authDomain: "cadathon-2f0a7.firebaseapp.com",
  projectId: "cadathon-2f0a7",
  storageBucket: "cadathon-2f0a7.firebasestorage.app",
  messagingSenderId: "658826509832",
  appId: "1:658826509832:web:61785c8a2122bd61b89bbd",
  measurementId: "G-QQ9EJW0B0P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };