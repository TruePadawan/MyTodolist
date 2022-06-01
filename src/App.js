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
  const { sidebarState, projects, setProjects } = useContext(TodoListContext);
  const signedInIndicatorRef = useRef(null);
  const [user, setUser] = useState("Sign In");

  const loadAppData = useCallback((snapshot) => {
    const data = DB_actions.getAppData(snapshot);
    if (data === null)
    {
      // IF USER IS SIGNING IN FOR FIRST TIME, CREATE DEFAULT PROJECT
      appManager.addProjectItem(true, {
        title : "Default",
        active : true,
        todos : {},
      });
    }
    else {
      for (const id in data)
      {
        if (data[id].active === true)
        {
          appManager.setActiveProjectID(id);
        }
        if (!data[id].hasOwnProperty("todos"))
        {
          data[id].todos = {};
        }
      }
      setProjects(data);
    }
  }, [setProjects]);

  /* When app loads, sign in the user if there was a previous sign in */
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (auth.currentUser && !appManager.userSignedIn)
      {
        setUser(auth.currentUser.displayName);
        appManager.setUserSignedIn(true);
        appManager.setUID(auth.currentUser.uid);

        const projectsDataRef = ref(database, `/${auth.currentUser.uid}/projects`);
        onValue(projectsDataRef, loadAppData);
      }
    });
  }, [loadAppData]);

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
      appManager.setUserSignedIn(false);
      appManager.setUID("");

      setProjects(window.localStorage.getObj("projects")); // WHEN THE USER SIGNS OUT, LOAD TODOITEMS FROM LOCAL STORAGE
    }
  };

  let activeProjectID = appManager.activeProjectID;
  let activeProject = projects[activeProjectID];
  // IN CASE OF NO PROJECT ITEMS
  if (activeProjectID === null)
  {
    activeProject = {
      title : "",
      todos : {}
    }
  }
  
  const mainClassName = sidebarState === "closed" ? "sidebarClosed" : "sidebarOpened";
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
