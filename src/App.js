import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { auth, database, googleProvider } from "./firebase/firebase_init";
import { getTodoItemsFromDB } from "./functions/firebase_db";

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import Header from "./components/header/Header";
import SideBar from "./components/sidebar/sidebar";
import TodoListContext from "./components/context/TodoListContext";
import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";
import "./App.css";

function App() {
  const { sidebarState, setContextData, MainController } = useContext(TodoListContext);
  const signedInIndicatorRef = useRef(null);
  const [signInBtnText, setSignInBtnText] = useState("Sign In");

  const loadTodoItemsFromDB = useCallback((snapshot) => {
    const todoList = getTodoItemsFromDB(snapshot);
    setContextData({ taskList: todoList });
  }, [setContextData]);

  /* When app loads, sign in the user if there was a previous sign in */
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (
        auth.currentUser &&
        signedInIndicatorRef.current.textContent === "Sign In"
      ) {
        setSignInBtnText(auth.currentUser.email);

        MainController.userLoggedIn = true;
        MainController.userID = auth.currentUser.uid;

        const todoItemsDBRef = ref(database, `/${auth.currentUser.uid}/items`);
        onValue(todoItemsDBRef, loadTodoItemsFromDB);
      }
    });
  }, [loadTodoItemsFromDB, MainController]);

  const signInWithGoogle = async () => {
    // IF THERE IS NO USER CURRENTLY LOGGED IN, LOGIN. ELSE, SIGN OUT
    if (auth.currentUser === null) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        alert(error);
      }
    } else {
      await signOut(auth);

      MainController.userLoggedIn = false;
      MainController.userID = "";

      setSignInBtnText("Sign In");
      setContextData({ taskList: window.localStorage.getObj("taskList") }); // WHEN THE USER SIGNS OUT, LOAD TODOITEMS FROM LOCAL STORAGE
    }
  };

  let mainClassName = sidebarState === "closed" ? "sidebarClosed" : "sidebarOpened";
  return (
    <div className="App">
      <Header />
      <main className={mainClassName}>
        <SideBar state={sidebarState}>
          <Button
          id="signInBtn"
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={signInWithGoogle}>
            <span ref={signedInIndicatorRef}>{signInBtnText}</span>
          </Button>
        </SideBar>
        <section className="container" aria-labelledby="currentProjectTitle">
          <h2 id="currentProjectTitle">Default</h2>
          <div className="todolist">
            <TodoListHeader />
            <TodoListBody />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
