import { onValue, ref } from "firebase/database";
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { firebaseRealtimeDBInstance as database } from "../firebase/firebase_init";
import { getLocalAppData, storeAppDataLocally } from "../utils/other-utils";
import { AuthContext } from "./AuthContextProvider";
import { v4 as uuid } from "uuid";

export const TodoListContext = createContext({
	data: {},
	createNewProject: (projectTitle) => {},
	addTodoItemToActiveProject: async (todoItemData) => {},
});

const TodoListContextProvider = (props) => {
	const { authenticatedUserData } = useContext(AuthContext);
	const [data, setData] = useState(getLocalAppData());
	const userSignedIn = authenticatedUserData !== null;

	const createNewProject = useCallback((projectTitle) => {
		if (!userSignedIn) {
			// UPDATE STATE AND DATA IN LOCALSTORAGE
			setData((snapshot) => {
				const projectID = uuid();
				snapshot[projectID] = {
					title: projectTitle,
					active: false,
					todos: {},
				};
				storeAppDataLocally(snapshot);
				return { ...snapshot };
			});
		} else {
			// CREATE PROJECT IN DB
		}
	}, []);

	const addTodoItemToActiveProject = useCallback(async (todoItemData) => {
		console.log(todoItemData);
	}, []);

	const processAppData = useCallback((snapshot) => {
		// PROCESS DATA
		console.log(snapshot);
	}, []);

	// LOAD USER TODO DATA FROM DB IF USER SIGNS IN ELSE FROM LOCALSTORAGE
	useEffect(() => {
		if (authenticatedUserData !== null) {
			const { id: userID } = authenticatedUserData;
			const appDataDBRef = ref(database, `/${userID}/projects`);
			return onValue(appDataDBRef, processAppData);
		} else {
			setData(getLocalAppData());
		}
	}, [authenticatedUserData, processAppData]);

	const value = { data, createNewProject, addTodoItemToActiveProject };
	return (
		<TodoListContext.Provider value={value}>
			{props.children}
		</TodoListContext.Provider>
	);
};

export default TodoListContextProvider;
