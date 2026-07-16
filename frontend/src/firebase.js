import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCijenaSnMsa4yQKawGl0ll5AWFJu_7hZo",
  authDomain: "enternprise-knowledge-platform.firebaseapp.com",
  projectId: "enternprise-knowledge-platform",
  storageBucket: "enternprise-knowledge-platform.firebasestorage.app",
  messagingSenderId: "535809627937",
  appId: "1:535809627937:web:12deac31b8ce764e225060",
  measurementId: "G-3SML3HLKP7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { auth, db, googleProvider, analytics };