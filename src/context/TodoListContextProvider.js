import { onValue, ref } from "firebase/database";
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
	firebaseRealtimeDBInstance as database,
	firebaseRealtimeDBInstance,
} from "../firebase/firebase_init";
import {
	getActiveProject,
	getLocalAppData,
	storeAppDataLocally,
} from "../utils/other-utils";
import { AuthContext } from "./AuthContextProvider";
import { v4 as uuid } from "uuid";
import {
	addTodoItemToDB,
	createProjectInDB,
	deleteProjectItemFromDB,
	deleteTodoItemFromDB,
	setProjects,
	updateProjectItemInDB,
	updateTodoItemInDB,
} from "../utils/firebase-utils";

export const TodoListContext = createContext({
	data: {},
	handleProjectCreation: async (projectTitle) => {},
	addTodoItem: async (todoItemData, projectID) => {},
	updateTodoItem: async (todoItemID, projectID, newData) => {},
	deleteTodoItem: async (todoItemID, projectID) => {},
	updateProjectItem: async (projectID, newData) => {},
	deleteProjectItem: async (projectID) => {},
	setProjectAsActive: async (projectID) => {},
});

const TodoListContextProvider = (props) => {
	const { authenticatedUserData } = useContext(AuthContext);
	const [data, setData] = useState(getLocalAppData());
	const userSignedIn = authenticatedUserData !== null;

	useEffect(() => {
		storeAppDataLocally(data);
	}, [data]);

	const processAppData = useCallback((snapshot) => {
		// PROCESS DATA, CREATE DEFAULT PROJECT IF NONE
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

	function handleProjectCreation(projectTitle) {
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
			return createProjectInDB(authenticatedUserData.uid, projectTitle);
		}
		return Promise.resolve();
	}

	function updateProjectItem(projectID, newData) {
		if (!userSignedIn) {
			setData((snapshot) => {
				const project = snapshot[projectID];
				snapshot[projectID] = { ...project, ...newData };
				return { ...snapshot };
			});
		} else {
			return updateProjectItemInDB(
				authenticatedUserData.uid,
				projectID,
				newData
			);
		}
		return Promise.resolve();
	}

	function deleteProjectItem(projectID) {
		if (!userSignedIn) {
			// IF THE PROJECT TO BE DELETED IS THE ACTIVE PROJECT, SET A NEW ACTIVE PROJECT
			// IF DELETED PROJECT WAS THE ONLY PROJECT, CREATE A DEFAULT PROJECT
			setData((snapshot) => {
				Reflect.deleteProperty(snapshot, projectID);
				const noActiveProject = getActiveProject(snapshot) === null;
				if (noActiveProject) {
					const projectIDs = Object.keys(snapshot);
					if (projectIDs.length > 0) {
						snapshot[projectIDs[0]].active = true;
					} else {
						snapshot = {
							[uuid()]: {
								title: "Default",
								active: true,
								todos: {},
							},
						};
					}
				}
				return { ...snapshot };
			});
		} else {
			return deleteProjectItemFromDB(authenticatedUserData.uid, projectID);
		}
		return Promise.resolve();
	}

	function addTodoItem(todoItemData, projectID) {
		if (userSignedIn) {
			return addTodoItemToDB(
				authenticatedUserData.uid,
				projectID,
				todoItemData
			);
		} else {
			setData((snapshot) => {
				const todoID = uuid();
				snapshot[projectID].todos[todoID] = todoItemData;
				return { ...snapshot };
			});
		}
		return Promise.resolve();
	}

	function updateTodoItem(todoItemID, projectID, newData) {
		if (!userSignedIn) {
			setData((snapshot) => {
				snapshot[projectID].todos[todoItemID] = newData;
				return { ...snapshot };
			});
		} else {
			return updateTodoItemInDB(
				authenticatedUserData.uid,
				projectID,
				todoItemID,
				newData
			);
		}
		return Promise.resolve();
	}

	function deleteTodoItem(todoItemID, projectID) {
		if (!userSignedIn) {
			setData((snapshot) => {
				Reflect.deleteProperty(snapshot[projectID].todos, todoItemID);
				return { ...snapshot };
			});
		} else {
			return deleteTodoItemFromDB(
				authenticatedUserData.uid,
				projectID,
				todoItemID
			);
		}
		return Promise.resolve();
	}

	function setProjectAsActive(projectID) {
		// FIND CURRENTLY ACTIVE PROJECT, DEACTIVATE IT,
		// ACTIVATE OTHER PROJECT
		if (!userSignedIn) {
			setData((snapshot) => {
				snapshot[projectID].active = true;
				for (const key in snapshot) {
					if (key !== projectID) {
						snapshot[key].active = false;
					}
				}
				return { ...snapshot };
			});
		} else {
			const databaseRef = ref(
				firebaseRealtimeDBInstance,
				`/${authenticatedUserData.uid}/projects`
			);
			onValue(
				databaseRef,
				(snapshot) => {
					const snapshotValue = snapshot.val();
					if (snapshotValue) {
						snapshotValue[projectID].active = true;
						for (const key in snapshotValue) {
							if (key !== projectID) {
								snapshotValue[key].active = false;
							}
						}
						setProjects(authenticatedUserData.uid, snapshotValue);
					}
				},
				{ onlyOnce: true }
			);
		}
	}

	const value = {
		data,
		handleProjectCreation,
		addTodoItem,
		updateTodoItem,
		deleteTodoItem,
		updateProjectItem,
		deleteProjectItem,
		setProjectAsActive,
	};

	return (
		<TodoListContext.Provider value={value}>
			{props.children}
		</TodoListContext.Provider>
	);
};

export default TodoListContextProvider;
