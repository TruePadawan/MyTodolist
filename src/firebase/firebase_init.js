import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAOe0dfJIzPvgXuX5DKDUegIwgHyF-w2DY",
  authDomain: "mytodolist-f53f0.firebaseapp.com",
  databaseURL: "https://mytodolist-f53f0-default-rtdb.firebaseio.com",
  projectId: "mytodolist-f53f0",
  storageBucket: "mytodolist-f53f0.appspot.com",
  messagingSenderId: "577542081379",
  appId: "1:577542081379:web:e723a7547be67cf30a6156",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);
