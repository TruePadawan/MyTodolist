import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

/* Simple functions for easily adding objects and array to localStorage */
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};

/* Create a key-value pair in local storage when the app is initially run for the very first time */

if (window.localStorage.getObj("taskList") === null) {
  window.localStorage.setObj("taskList", []);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
