import { v4 as uuid } from "uuid";

export const APP_LOCALSTORAGE_KEY = "mytodolist-data";

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
