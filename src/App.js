import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { auth, database, googleProvider } from "./firebase/firebase_init";
import { DB_actions } from "./functions/firebase_db";
import { appManager } from "./managers/appManager";
import { getActiveProject, getActiveProjectID, getLocalAppData, setNewActiveProject, toLocalStorage } from "./functions/projects";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/sidebar";
import { TodoListContext } from "./context/TodoListContextProvider";
import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";
import Info from "./components/info/info";

import "./App.css";

function App() {
  const { sidebarState, projects, setProjects } = useContext(TodoListContext);
  const signedInIndicatorRef = useRef(null);
  const [onLoading, setLoading] = useState(true);
  const [user, setUser] = useState("Sign In");

  // RESPONSIBLE FOR LOADING IN THE PROJECT AND TODO DATA
  const loadAppData = useCallback(
    (snapshot) => {
      const data = DB_actions.getAppData(snapshot);
      setLoading(false);

      // IF USER IS SIGNING IN FOR FIRST TIME, CREATE DEFAULT PROJECT
      if (data === null)
      {
        const item = appManager.createProjectItem("Default", true);
        DB_actions.addProjectItem(appManager.uid, item);
        return;
      }
      else if (getActiveProjectID(data) === null)
      {
        const updatedAppData = setNewActiveProject(data);
        DB_actions.setProjects(appManager.uid, updatedAppData);
        return;
      }
      // ELSE LOAD APPDATA
      for (const id in data)
      {
        if (data[id].active === true)
        {
          appManager.activeProjectID = id;
        }
        if (!data[id].hasOwnProperty("todos"))
        {
          data[id].todos = {};
        }
      }
      setProjects(data);
    }, [setLoading, setProjects]);

  // When app loads, sign in the user if there was a previous sign in
  useEffect(() => {
    auth.onAuthStateChanged(function signUserIn() {
      if (auth.currentUser && !appManager.userSignedIn) {
        setLoading(true);
        setUser(auth.currentUser.displayName);
        appManager.userSignedIn = true;
        appManager.uid = auth.currentUser.uid;

        const appDataRef = ref(
          database,
          `/${auth.currentUser.uid}/projects`
        );
        onValue(appDataRef, loadAppData);
      }
    });
  }, [loadAppData]);

  useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser === null) {
        setLoading(false);

        // CREATE DEFAULT PROJECT IF THERE IS NONE, ELSE LOAD EXISTING APP DATA
        const appData = getLocalAppData();
        const amountOfProjects = Object.keys(appData).length;
        if (amountOfProjects === 0)
        {
          const itemID = uuidv4();
          const item = appManager.createProjectItem("Default", true);
          const projects = {
            [itemID] : item
          };

          toLocalStorage(projects);
          setProjects(projects);
          return;
        }
        setProjects(appData);
      }
    }, 4000);
  }, [setProjects]);

  const signInWithGoogle = async () => {
    // IF THERE IS NO USER CURRENTLY LOGGED IN, LOGIN. ELSE, SIGN OUT
    try {
      if (auth.currentUser === null) {
          await signInWithPopup(auth, googleProvider);
      }
      else {
        await signOut(auth);
  
        setUser("Sign In");
        appManager.userSignedIn = false;
        appManager.uid = "";
  
        setProjects(getLocalAppData()); // WHEN THE USER SIGNS OUT, LOAD TODOITEMS FROM LOCAL STORAGE
      }
    } catch (error)
    {
      alert(error.message);
    }
  };

  const activeProject = getActiveProject(projects, appManager.activeProjectID);
  const mainClassName = sidebarState === "closed" ? "sidebarClosed" : "sidebarOpened";

  return (
    <>
    {onLoading && (
      <Info message={"Loading AppData..."} />
    )}
      <div className="App">
        <Header />
        <main className={mainClassName}>
          <SideBar state={sidebarState} data={projects}>
            <Button
              id="signInBtn"
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={signInWithGoogle}
            >
              <span ref={signedInIndicatorRef}>{user}</span>
            </Button>
          </SideBar>
          <section className="container" aria-labelledby="currentProjectTitle">
            <h2 id="currentProjectTitle">{activeProject.title}</h2>
            <div className="todolist">
              <TodoListHeader />
              <TodoListBody todos={activeProject.todos} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
