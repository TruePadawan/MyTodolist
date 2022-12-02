import { onValue, ref } from "firebase/database";
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { firebaseRealtimeDBInstance as database } from "../firebase/firebase_init";
import { getLocalAppData, storeAppDataLocally } from "../utils/other-utils";
import { AuthContext } from "./AuthContextProvider";
import { v4 as uuid } from "uuid";
import { createProjectInDB } from "../utils/firebase-utils";

export const TodoListContext = createContext({
	data: {},
	handleProjectCreation: (projectTitle) => {},
	addTodoItemToActiveProject: async (todoItemData) => {},
	updateTodoItem: (todoItemID, projectID, newData) => {},
	deleteTodoItem: (todoItemID, projectID) => {},
});

const TodoListContextProvider = (props) => {
	const { authenticatedUserData } = useContext(AuthContext);
	const [data, setData] = useState(getLocalAppData());

	useEffect(() => {
		storeAppDataLocally(data);
	}, [data]);

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

	const handleProjectCreation = useCallback(
		(projectTitle) => {
			const userSignedIn = authenticatedUserData !== null;
			if (!userSignedIn) {
				setData((snapshot) => {
					const projectID = uuid();
					snapshot[projectID] = {
						title: projectTitle,
						active: false,
						todos: {},
					};
					return { ...snapshot };
				});
			} else {
				// CREATE PROJECT IN DB
				createProjectInDB(authenticatedUserData.uid, projectTitle);
			}
		},
		[authenticatedUserData]
	);

	const addTodoItemToActiveProject = useCallback(async (todoItemData) => {
		console.log(todoItemData);
	}, []);

	const updateTodoItem = useCallback((todoItemID, projectID, newData) => {
		setData((snapshot) => {
			snapshot[projectID].todos[todoItemID] = newData;
			return { ...snapshot };
		});
	}, []);

	const deleteTodoItem = useCallback((todoItemID, projectID) => {
		setData((snapshot) => {
			Reflect.deleteProperty(snapshot[projectID].todos, todoItemID);
			return { ...snapshot };
		});
	}, []);

	const value = {
		data,
		handleProjectCreation,
		addTodoItemToActiveProject,
		updateTodoItem,
		deleteTodoItem,
	};

	return (
		<TodoListContext.Provider value={value}>
			{props.children}
		</TodoListContext.Provider>
	);
};

export default TodoListContextProvider;
