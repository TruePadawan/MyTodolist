import React from "react";
import ReactDOM from "react-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import App from "./App";
import TodoListContextProvider from "./context/TodoListContextProvider";
import "./index.css";

/* Simple functions for easily adding objects and array to localStorage */
Storage.prototype.setObj = function (key, obj) {
	return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
	return JSON.parse(this.getItem(key));
};

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TodoListContextProvider>
				<App />
			</TodoListContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
