import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1Bc0coECQ9Fy2d0QzjBgwZs7DWoQLQFs",
  authDomain: "social-media-fc3da.firebaseapp.com",
  projectId: "social-media-fc3da",
  storageBucket: "social-media-fc3da.appspot.com",
  messagingSenderId: "208301929091",
  appId: "1:208301929091:web:29e6782b312ed59ac121b6",
  measurementId: "G-QK7FSTLT4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);