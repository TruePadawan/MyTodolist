import { ref, push, remove, update, set } from "firebase/database";
import { firebaseRealtimeDBInstance as database } from "../firebase/firebase_init";

export function setProjects(userID, projects) {
	const databaseRef = ref(database, `/${userID}/projects`);
	set(databaseRef, projects);
}

export function createProjectInDB(userID, projectTitle) {
	const databaseRef = ref(database, `/${userID}/projects`);
	push(databaseRef, {
		title: projectTitle,
		active: false,
		todos: {},
	});
}

export function addTodoItemToDB(userID, projectID, todoItem) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}/todos`);
	push(databaseRef, todoItem);
}

export function updateProjectItemInDB(userID, projectID, value) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}`);
	update(databaseRef, value);
}

export function updateTodoItemInDB(userID, projectID, itemID, value) {
	const databaseRef = ref(
		database,
		`/${userID}/projects/${projectID}/todos/${itemID}`
	);
	update(databaseRef, value);
}

export function deleteProjectItemFromDB(userID, projectID) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}`);
	remove(databaseRef);
}

export function deleteTodoItemFromDB(userID, projectID, itemID) {
	const databaseRef = ref(
		database,
		`/${userID}/projects/${projectID}/todos/${itemID}`
	);
	remove(databaseRef);
}

export function getAppData(snapshot) {
	const data = snapshot.val();
	return data;
}
