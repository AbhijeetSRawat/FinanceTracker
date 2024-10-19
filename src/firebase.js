// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore,doc,setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBL4nh7CUGDEqihGpiOqIUHbixch15xOD8",
  authDomain: "pennytrack017.firebaseapp.com",
  projectId: "pennytrack017",
  storageBucket: "pennytrack017.appspot.com",
  messagingSenderId: "1060197359056",
  appId: "1:1060197359056:web:f42dbcbc706a1210226dd5",
  measurementId: "G-S11YPL9RY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {db,auth,provider,doc,analytics,setDoc};