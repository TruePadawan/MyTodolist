import { useState, useEffect, useRef } from "react";
import { getActiveProjectID } from "../../functions/projects";
import { appManager } from "../../managers/appManager";
import TodoListContext from "./TodoListContext";
import notifIcon from "./assets/todolist.ico";

const TodoListContextProvider = (props) => {
  const [projects, setProjects] = useState({});
  const [noProjects, setNoProjects] = useState(false);
  const [sidebarState, setSideBarState] = useState("opened");
  const scheduledNotifs = useRef({});
  appManager.activeProjectID = getActiveProjectID(projects);

  useEffect(() => {
    if (Object.keys(projects).length === 0) {
      setNoProjects(true);
    } else {
      setNoProjects(false);
    }
  }, [setNoProjects, projects]);

  const scheduleNotification = ({ id, title, body }, timeout) => {
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
    if (id in scheduledNotifs.current) return;
    scheduledNotifs.current[id] = "scheduled";
    setTimeout(() => {
      const activeProjectID = appManager.activeProjectID;
      if (id in projects[activeProjectID].todos && projects[activeProjectID].todos[id].done === false)
      {
        new Notification(title, { body, icon: notifIcon });
        delete scheduledNotifs.current[id];
      }
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
