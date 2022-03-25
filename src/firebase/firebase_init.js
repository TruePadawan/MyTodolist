import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

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

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (auth.currentUser === null) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user_name = result.user.displayName;
      if (user_name) {
        localStorage.setItem("user_name", user_name);
        document.getElementById("userLogin-span").textContent = user_name;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    await signOut(auth);
    localStorage.removeItem("user_name");
    document.getElementById("userLogin-span").textContent = "Sign In";
  }
};
