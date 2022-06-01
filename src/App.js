import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { auth, database, googleProvider } from "./firebase/firebase_init";
import { DB_actions } from "./functions/firebase_db";
import { appManager } from "./managers/appManager";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/sidebar";
import TodoListContext from "./components/context/TodoListContext";
import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";

import "./App.css";

function App() {
  const {
    sidebarState,
    projects,
    setProjects,
    activeProjectID,
    userSignedIn, setUserSignedIn,
    userID, setUserID,
  } = useContext(TodoListContext);
  const signedInIndicatorRef = useRef(null);
  const [user, setUser] = useState("Sign In");

  const loadAppData = useCallback((snapshot) => {
    const data = DB_actions.getAppData(snapshot);

    console.log('appdata', data);
    if (data === null)
    {
      appManager.addProjectItem(true, {
        title : "Default",
        active : true,
        todos : {}
      }, userID);
    }
  }, [userID]);

  /* When app loads, sign in the user if there was a previous sign in */
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser && !userSignedIn)
      {
        setUser(auth.currentUser.displayName);
        setUserSignedIn(true);
        setUserID(auth.currentUser.uid);

        const projectsDataRef = ref(database, `/${auth.currentUser.uid}/projects`);
        onValue(projectsDataRef, loadAppData);
      }
    });
  }, [loadAppData, setUserID, setUserSignedIn, userSignedIn]);

  const signInWithGoogle = async () => {
    // IF THERE IS NO USER CURRENTLY LOGGED IN, LOGIN. ELSE, SIGN OUT
    if (auth.currentUser === null)
    {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        alert(error);
      }
    }
    else
    {
      await signOut(auth);

      setUser("Sign In");
      setUserSignedIn(false);
      setUserID("");

      setProjects(window.localStorage.getObj("projects")); // WHEN THE USER SIGNS OUT, LOAD TODOITEMS FROM LOCAL STORAGE
    }
  };

  const mainClassName = sidebarState === "closed" ? "sidebarClosed" : "sidebarOpened";
  let activeProject = projects[activeProjectID];
  // IN CASE OF NO PROJECT ITEMS
  if (activeProjectID === null)
  {
    activeProject = {
      title : "",
      todos : {}
    }
  }

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
            <span ref={signedInIndicatorRef}>{user}</span>
          </Button>
        </SideBar>
        <section className="container" aria-labelledby="currentProjectTitle">
          <h2 id="currentProjectTitle">{activeProject.title}</h2>
          <div className="todolist">
            <TodoListHeader />
            <TodoListBody todos={activeProject.todos}/>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
