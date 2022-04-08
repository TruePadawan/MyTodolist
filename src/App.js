import { useEffect, useState, useRef, useCallback, useContext } from "react";

import TodoListContext from "./components/context/TodoListContext";
import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import { MainController } from "./controller/controller";

import { signInWithPopup, signOut } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { auth, database, googleProvider } from "./firebase/firebase_init";

import "./App.css";

// OBSERVER CHANGES IN THE WIDTH OF THE APP
let resizeObserver = new ResizeObserver((entries) => {
  let width = entries[0].borderBoxSize[0].inlineSize;
  let height = entries[0].borderBoxSize[0].blockSize;

  if (width <= 0 || height <= 0) {
    width = 480;
    height = 480;
  }

  let appSize = { width, height };

  window.localStorage.setObj("appSize", appSize);
});

function App() {
  const { setContextData } = useContext(TodoListContext);
  const signedInIndicatorRef = useRef(null);
  const [signInBtnText, setSignInBtnText] = useState("Sign In");

  const loadTodoItemsFromDB = useCallback((snapshot) => {
    const todoData = snapshot.val();
    const todoList = [];

    for (let id in todoData)
    {
      let todoItem = {
        [id]: {
          title: todoData[id].title,
          complete: todoData[id].complete,
        },
      };

      todoList.push(todoItem);
    }

    setContextData({ taskList: todoList });
  },[setContextData]); 

  /* When app loads, set the app size dimensions to what it was before it was closed */
  useEffect(() => {
    let appSize = window.localStorage.getObj("appSize");
    let appBody = document.querySelector("main");

    if (appSize !== null) {
      appBody.style.width = `${appSize.width}px`;
      appBody.style.height = `${appSize.height}px`;
    }
    resizeObserver.observe(appBody);

  }, []);

  /* When app loads, sign in the user if there was a previous sign in */
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser && signedInIndicatorRef.current.textContent === "Sign In") {
        setSignInBtnText(auth.currentUser.email);

        MainController.userLoggedIn = true;
        MainController.userID = auth.currentUser.uid;

        const todoItemsDBRef = ref(database, `/${auth.currentUser.uid}/items`);
        onValue(todoItemsDBRef,loadTodoItemsFromDB);
      }
    });
  }, [loadTodoItemsFromDB]);

  
  const signInWithGoogle = async () => {
    // IF THERE IS NO USER CURRENTLY LOGGED IN, LOGIN. ELSE, SIGN OUT
    if (auth.currentUser === null) {
      try {
        await signInWithPopup(auth, googleProvider);
      }
      catch (error) {
        alert(error);
      }
    }
    else {
      await signOut(auth);

      MainController.userLoggedIn = false;
      MainController.userID = '';

      setSignInBtnText("Sign In");
      setContextData({taskList: window.localStorage.getObj("taskList")}); // WHEN THE USER SIGNS OUT, LOAD TODOITEMS FROM LOCAL STORAGE
    }
  };

  return (
    <div className="App">
      <h1>MyTodoList</h1>
      <Button
        id="signIn-btn"
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
      >
        <span ref={signedInIndicatorRef}>{signInBtnText}</span>
      </Button>
        <main>
          <TodoListHeader />
          <TodoListBody />
        </main>
    </div>
  );
}

export default App;
