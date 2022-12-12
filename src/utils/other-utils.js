import { v4 as uuid } from "uuid";
import ProjectItem from "../components/other/item/ProjectItem/ProjectItem";

export const APP_LOCALSTORAGE_KEY = "mytodolist-data";
export const TODO_TITLE_MINLENGTH = 3;
export const PROJECT_TITLE_MINLENGTH = 3;

/* Simple functions for easily adding objects and array to localStorage */
Storage.prototype.setObj = function (key, obj) {
	return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function (key) {
	return JSON.parse(this.getItem(key));
};

export function getLocalAppData() {
	const cachedData = localStorage.getObj(APP_LOCALSTORAGE_KEY);
	if (cachedData === null) {
		return {
			[uuid()]: {
				title: "Default",
				active: true,
				todos: {},
			},
		};
	}
	return cachedData;
}

export function storeAppDataLocally(data) {
	localStorage.setObj(APP_LOCALSTORAGE_KEY, data);
}

export function getActiveProject(projectsData) {
	for (const projectID in projectsData) {
		if (projectsData[projectID].active) {
			return {
				id: projectID,
				...projectsData[projectID],
			};
		}
	}
	return null;
}

export function getProjectItems(data) {
	let IDs = Object.keys(data);
	let projectItems = IDs.map((id) => {
		const { title, active } = data[id];
		return <ProjectItem key={id} projectData={{ id, title, active }} />;
	});
	return projectItems;
}
