import { ref, push, remove, update, set } from "firebase/database";
import { firebaseRealtimeDBInstance as database } from "../firebase/firebase_init";

export function setProjects(userID, projects) {
	const databaseRef = ref(database, `/${userID}/projects`);
	set(databaseRef, projects);
}

export function addProjectItem(userID, projectItem) {
	const databaseRef = ref(database, `/${userID}/projects`);
	push(databaseRef, projectItem);
}

export function addTodoItem(userID, projectID, todoItem) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}/todos`);
	push(databaseRef, todoItem);
}

export function updateProjectItem(userID, projectID, value) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}`);
	update(databaseRef, value);
}

export function updateTodoItem(userID, projectID, itemID, value) {
	const databaseRef = ref(
		database,
		`/${userID}/projects/${projectID}/todos/${itemID}`
	);
	update(databaseRef, value);
}

export function deleteProjectItem(userID, projectID) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}`);
	remove(databaseRef);
}

export function deleteTodoItem(userID, projectID, itemID) {
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
