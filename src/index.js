import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthContextProvider from "./context/AuthContextProvider";
import App from "./App";
import TodoListContextProvider from "./context/TodoListContextProvider";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<AuthContextProvider>
			<TodoListContextProvider>
				<App />
			</TodoListContextProvider>
		</AuthContextProvider>
	</StrictMode>
);
