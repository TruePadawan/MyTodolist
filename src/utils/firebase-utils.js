import { ref, push, remove, update, set } from "firebase/database";
import { firebaseRealtimeDBInstance as database } from "../firebase/firebase_init";

export function setProjects(userID, projects) {
	const databaseRef = ref(database, `/${userID}/projects`);
	return set(databaseRef, projects);
}

export function createProjectInDB(userID, projectData) {
	const databaseRef = ref(database, `/${userID}/projects`);
	return push(databaseRef, projectData);
}

export function addTodoItemToDB(userID, projectID, todoItem) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}/todos`);
	return push(databaseRef, todoItem);
}

export function updateProjectItemInDB(userID, projectID, value) {
	const databaseRef = ref(database, `/${userID}/projects/${projectID}`);
	return update(databaseRef, value);
}

export function updateTodoItemInDB(userID, projectID, itemID, value) {
	const databaseRef = ref(
		database,
		`/${userID}/projects/${projectID}/todos/${itemID}`
	);
	return update(databaseRef, value);
}

export function deleteProjectItemFromDB(userID, projectID) {
	// IF PROJECT TO BE DELETED IS LAST PROJECT, SET A DEFAULT PROJECT
	const databaseRef = ref(database, `/${userID}/projects/${projectID}`);
	return remove(databaseRef);
}

export function deleteTodoItemFromDB(userID, projectID, itemID) {
	const databaseRef = ref(
		database,
		`/${userID}/projects/${projectID}/todos/${itemID}`
	);
	return remove(databaseRef);
}

export function getAppData(snapshot) {
	const data = snapshot.val();
	return data;
}
