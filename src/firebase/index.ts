import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const ENVS = import.meta.env;
const firebaseConfig = {
  apiKey: ENVS.VITE_FIREBASE_API_KEY,
  authDomain: ENVS.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: ENVS.VITE_FIREBASE_PROJECT_ID,
  storageBucket: ENVS.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENVS.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENVS.VITE_FIREBASE_APP_ID,
  measurementId: ENVS.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);