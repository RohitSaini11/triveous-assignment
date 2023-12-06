import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2JOt9UXkFY9frIF33EDv1d_rUWvO2OsY",
  authDomain: "triveous-b3c1d.firebaseapp.com",
  projectId: "triveous-b3c1d",
  storageBucket: "triveous-b3c1d.appspot.com",
  messagingSenderId: "1039666971171",
  appId: "1:1039666971171:web:eeac7b54a07e2507956796"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();