
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCv1sLbmr_o3R2Z7doVMjQwQ1D18AM8g-g",
  authDomain: "icsexam-c2fc4.firebaseapp.com",
  projectId: "icsexam-c2fc4",
  storageBucket: "icsexam-c2fc4.appspot.com",
  messagingSenderId: "17265406382",
  appId: "1:17265406382:web:b2392c2a2a2118ae3c183f",
  measurementId: "G-WXXEPFNN9Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)