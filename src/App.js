import { useEffect } from "react";
import TodoListContextProvider from "./components/context/TodoListContextProvider";
import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";
import { signInWithGoogle } from "./firebase/firebase_init";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

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
  /* When app loads, set the app dimensions to what it was before it was closed */
  useEffect(() => {
    let appSize = window.localStorage.getObj("appSize");
    let appBody = document.querySelector("main");

    if (appSize !== null) {
      appBody.style.width = `${appSize.width}px`;
      appBody.style.height = `${appSize.height}px`;
    }
    resizeObserver.observe(appBody);
  }, []);

  let userName = localStorage.getItem("user_name");

  return (
    <div className="App">
      <h1>MyTodoList</h1>
      <Button
        id="signIn-btn"
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
      >
        <span id="userLogin-span">{userName ? userName : "Sign In"}</span>
      </Button>

      <TodoListContextProvider>
        <main>
          <TodoListHeader />
          <TodoListBody />
        </main>
      </TodoListContextProvider>
    </div>
  );
}

export default App;
