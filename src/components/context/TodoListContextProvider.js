import { useState, useEffect } from "react";
import { getActiveProjectID } from "../../functions/projects";
import { appManager } from "../../managers/appManager";
import TodoListContext from "./TodoListContext";
import notifIcon from "./assets/todolist.ico";

const TodoListContextProvider = (props) => {
  const [projects, setProjects] = useState({});
  const [noProjects, setNoProjects] = useState(false);
  const [sidebarState, setSideBarState] = useState("opened");
  appManager.activeProjectID = getActiveProjectID(projects);

  useEffect(() => {
    if (Object.keys(projects).length === 0) {
      setNoProjects(true);
    } else {
      setNoProjects(false);
    }
  }, [setNoProjects, projects]);

  const scheduleNotification = ({ title, body }, timeout) => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
        .then((permission) => {
          if (permission !== "granted") {
            throw new Error("Notifications won't be shown unless site is given permission!");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    console.log(`Scheduling for ${title}`);
    setTimeout(() => {
      new Notification(title, { body, icon: notifIcon });
    }, timeout);
  };

  return (
    <TodoListContext.Provider
      value={{
        projects,
        setProjects,
        noProjects,
        sidebarState,
        setSideBarState,
        scheduleNotification,
      }}
    >
      {props.children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
