import React from "react";
import ReactDOM from "react-dom";
import { createProjectItem } from "./functions/projects";
import TodoListContextProvider from "./components/context/TodoListContextProvider";
import App from "./App";

import "./index.css";

/* Simple functions for easily adding objects and array to localStorage */
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

/* Create a key-value pair in local storage when the app is initially run for the very first time */
let projects = window.localStorage.getObj("projects");
if (projects === null || Object.keys(projects).length === 0) {
  let projectItem = createProjectItem("Default", true);
  let defaultProjectsList = {
    [projectItem.id] : projectItem
  };
  window.localStorage.setObj("projects", defaultProjectsList);
}

ReactDOM.render(
  <React.StrictMode>
    <TodoListContextProvider>
      <App />
    </TodoListContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
