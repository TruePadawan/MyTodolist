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
	addTodoItemToActiveProject: async (todoItemData) => {},
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

	const addTodoItemToActiveProject = async (todoItemData) => {
		const project = getActiveProject(data);
		const todos = project.todos;
		const todoID = uuid();
		todos[todoID] = todoItemData;
		const updatedProjectData = {
			title: project.title,
			active: project.active,
			todos,
		};
		updateProjectItem(project.id, updatedProjectData);
	};

	const updateTodoItem = useCallback(
		(todoItemID, projectID, newData) => {
			if (!userSignedIn) {
				setData((snapshot) => {
					const todos = snapshot[projectID].todos;
					snapshot[projectID].todos[todoItemID] = { ...todos, ...newData };
					return { ...snapshot };
				});
			} else {
				updateTodoItemInDB(
					authenticatedUserData.uid,
					projectID,
					todoItemID,
					newData
				);
			}
		},
		[userSignedIn, authenticatedUserData]
	);

	const deleteTodoItem = useCallback(
		(todoItemID, projectID) => {
			if (!userSignedIn) {
				setData((snapshot) => {
					Reflect.deleteProperty(snapshot[projectID].todos, todoItemID);
					return { ...snapshot };
				});
			} else {
				deleteTodoItemFromDB(authenticatedUserData.uid, projectID, todoItemID);
			}
		},
		[userSignedIn, authenticatedUserData]
	);

	const updateProjectItem = useCallback(
		(projectID, newData) => {
			if (!userSignedIn) {
				setData((snapshot) => {
					const project = snapshot[projectID];
					snapshot[projectID] = { ...project, ...newData };
					return { ...snapshot };
				});
			} else {
				updateProjectItemInDB(authenticatedUserData.uid, projectID, newData);
			}
		},
		[authenticatedUserData, userSignedIn]
	);

	const deleteProjectItem = useCallback(
		(projectID) => {
			if (!userSignedIn) {
				setData((snapshot) => {
					Reflect.deleteProperty(snapshot, projectID);
					return { ...snapshot };
				});
			} else {
				deleteProjectItemFromDB(authenticatedUserData.uid, projectID);
			}
		},
		[authenticatedUserData, userSignedIn]
	);

	const setProjectAsActive = useCallback(
		(projectID) => {
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
				// FIND ACTIVE PROJECT, DEACTIVATE,
				// ACTIVATE OTHER PROJECT
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
		},
		[userSignedIn, authenticatedUserData]
	);

	const value = {
		data,
		handleProjectCreation,
		addTodoItemToActiveProject,
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
